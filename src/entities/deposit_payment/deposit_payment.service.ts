import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { VoucherService } from '../voucher/voucher.service';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { CreateDepositPaymentDto } from './dto/create-deposit_payment.dto';
import { UpdateDepositPaymentDto } from './dto/update-deposit_payment.dto';
import { ResponseDepositPaymentDto } from './dto/response-deposit_payment.dto';

@Injectable()
export class DepositPaymentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
  ) {}

  async create(createDto: CreateDepositPaymentDto) {
    const {
      depositPaymentType,
      paymentMethod,
      paymentBankName,
      receipBankName,
      description,
      idCardNo,
      issuedBy,
      issuedDate,
      voucherNumber,
      voucherDate,
      employee,
      bank,
      supplier,
      subject,
      companyId,
      circularId,
    } = createDto;

    const createVoucherDto: CreateVoucherDto = {
      voucherType: 'DEPOSIT_PAYMENT',
      voucherDate,
      postedDate: voucherDate,
      voucherNumber,
      companyId,
      circularId,
    };

    const result = await this.prismaService.$transaction(async (tx) => {
      const newVoucher = await this.voucherService.createWithTransaction(
        createVoucherDto,
        tx,
      );

      const created = await tx.depositPayment.create({
        data: {
          depositPaymentType,
          paymentMethod,
          paymentBankName,
          receipBankName,
          description,
          idCardNo,
          issuedBy,
          issuedDate,
          Employee: employee ? { connect: { id: employee } } : undefined,
          Bank: bank ? { connect: { id: bank } } : undefined,
          Supplier: supplier ? { connect: { id: supplier } } : undefined,
          Subject: subject ? { connect: { id: subject } } : undefined,
          company: { connect: { id: companyId } },
          voucher: { connect: { id: newVoucher.id } },
        },
        include: {
          Employee: true,
          Bank: true,
          Supplier: true,
          Subject: true,
          company: true,
          voucher: true,
        },
      });

      return created;
    });

    return plainToInstance(ResponseDepositPaymentDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const list = await this.prismaService.depositPayment.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: {
        Employee: true,
        Bank: true,
        Supplier: true,
        Subject: true,
        company: true,
        voucher: true,
        DepositPaymentItem_DepositPayment: true,
      },
    });

    return plainToInstance(ResponseDepositPaymentDto, list, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const found = await this.prismaService.depositPayment.findUnique({
      where: { id },
      include: {
        Employee: true,
        Bank: true,
        Supplier: true,
        Subject: true,
        company: true,
        voucher: true,
      },
    });

    if (!found || found.deletedAt) {
      throw new NotFoundException('Bank transfer payment voucher not found');
    }

    return plainToInstance(ResponseDepositPaymentDto, found, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateDto: UpdateDepositPaymentDto) {
    const existing = await this.prismaService.depositPayment.findUnique({
      where: { id },
      include: { voucher: true },
    });

    if (!existing || existing.deletedAt) {
      throw new NotFoundException('Bank transfer payment voucher not found');
    }

    const {
      depositPaymentType,
      paymentMethod,
      paymentBankName,
      receipBankName,
      description,
      idCardNo,
      issuedBy,
      issuedDate,
      voucherNumber,
      voucherDate,
      employee,
      bank,
      supplier,
      subject,
      circularId,
    } = updateDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      await this.voucherService.updateWithTransaction(
        existing.voucher?.id,
        { voucherDate, postedDate: voucherDate, voucherNumber, circularId },
        tx,
      );

      const updated = await tx.depositPayment.update({
        where: { id },
        data: {
          depositPaymentType,
          paymentMethod,
          paymentBankName,
          receipBankName,
          description,
          idCardNo,
          issuedBy,
          issuedDate,
          Employee: employee ? { connect: { id: employee } } : undefined,
          Bank: bank ? { connect: { id: bank } } : undefined,
          Supplier: supplier ? { connect: { id: supplier } } : undefined,
          Subject: subject ? { connect: { id: subject } } : undefined,
        },
        include: {
          Employee: true,
          Bank: true,
          Supplier: true,
          Subject: true,
          company: true,
          voucher: true,
        },
      });

      return updated;
    });

    return plainToInstance(ResponseDepositPaymentDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.depositPayment.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Xóa phiếu chi tiền gửi thành công' };
  }
}
