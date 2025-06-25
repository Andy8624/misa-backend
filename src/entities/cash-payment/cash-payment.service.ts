import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseCashPaymentDto } from './dto/response-cash-payment.dto';
import { CreateCashPaymentDto } from './dto/create-cash-payment.dto';
import { UpdateCashPaymentDto } from './dto/update-cash-payment.dto';
import { VoucherService } from '../voucher/voucher.service';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';

@Injectable()
export class CashPaymentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
  ) {}
  async create(createCashPaymentDto: CreateCashPaymentDto) {
    const {
      cashPaymentVoucherType,
      recipient,
      postedDate,
      voucherDate,
      voucherNumber,
      reason,
      withOriginalVoucher,
      employee,
      subject,
      supplier,
      companyId,
      circularId,
    } = createCashPaymentDto;

    const createVoucherDto: CreateVoucherDto = {
      voucherType: 'CASH_PAYMENT',
      postedDate,
      voucherDate,
      voucherNumber,
      companyId,
      circularId,
    };

    const result = await this.prismaService.$transaction(async (tx) => {
      const newVoucher = await this.voucherService.createWithTransaction(
        createVoucherDto,
        tx,
      );

      const createdCashPayment = await tx.cashPayment.create({
        data: {
          cashPaymentVoucherType,
          recipient,
          reason,
          withOriginalVoucher,
          Employee: employee ? { connect: { id: employee } } : undefined,
          Subject: subject ? { connect: { id: subject } } : undefined,
          Supplier: supplier ? { connect: { id: supplier } } : undefined,
          company: { connect: { id: companyId } },
          voucher: { connect: { id: newVoucher.id } },
        },
        include: {
          Employee: true,
          Subject: true,
          Supplier: true,
          CashPaymentVoucherItem: true,
          voucher: true,
        },
      });

      return createdCashPayment;
    });

    return plainToInstance(ResponseCashPaymentDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const cashPayments = await this.prismaService.cashPayment.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Employee: true,
        Subject: true,
        Supplier: true,
        CashPaymentVoucherItem: true,
        voucher: true,
      },
    });

    return plainToInstance(ResponseCashPaymentDto, cashPayments, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const cashPayment = await this.prismaService.cashPayment.findUnique({
      where: { id },
      include: {
        Employee: true,
        Subject: true,
        Supplier: true,
        CashPaymentVoucherItem: true,
        voucher: true,
      },
    });

    if (!cashPayment || cashPayment.deletedAt) {
      throw new NotFoundException('Cash payment voucher not found');
    }

    return plainToInstance(ResponseCashPaymentDto, cashPayment, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateCashPaymentDto: UpdateCashPaymentDto) {
    // Kiểm tra xem phiếu chi có tồn tại không
    const existing = await this.prismaService.cashPayment.findUnique({
      where: { id },
      include: { voucher: true },
    });

    if (!existing || existing.deletedAt) {
      throw new NotFoundException('Cash payment voucher not found');
    }

    const {
      cashPaymentVoucherType,
      recipient,
      postedDate,
      voucherDate,
      voucherNumber,
      reason,
      withOriginalVoucher,
      employee,
      subject,
      supplier,
      circularId,
    } = updateCashPaymentDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      // Cập nhật phiếu kế toán (voucher)
      await this.voucherService.updateWithTransaction(
        existing.voucher.id,
        {
          voucherDate,
          postedDate,
          voucherNumber,
          circularId,
        },
        tx,
      );

      // Cập nhật phiếu chi
      const updatedCashPayment = await tx.cashPayment.update({
        where: { id },
        data: {
          cashPaymentVoucherType,
          recipient,
          reason,
          withOriginalVoucher,
          Employee: employee ? { connect: { id: employee } } : undefined,
          Subject: subject ? { connect: { id: subject } } : undefined,
          Supplier: supplier ? { connect: { id: supplier } } : undefined,
        },
        include: {
          Employee: true,
          Subject: true,
          Supplier: true,
          CashPaymentVoucherItem: true,
          voucher: true,
        },
      });

      return updatedCashPayment;
    });

    return plainToInstance(ResponseCashPaymentDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.cashPayment.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa phiếu chi tiền mặt thành công' };
  }
}
