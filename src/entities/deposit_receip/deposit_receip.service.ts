import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { VoucherService } from '../voucher/voucher.service';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { CreateDepositReceipDto } from './dto/create-deposit_receip.dto';
import { ResponseDepositReceipDto } from './dto/response-deposit_receip.dto';
import { UpdateDepositReceipDto } from './dto/update-deposit_receip.dto';

@Injectable()
export class DepositReceipService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
  ) {}

  async create(createDepositReceipDto: CreateDepositReceipDto) {
    const {
      depositReceipType,
      postedDate,
      voucherDate,
      voucherNumber,
      reason,
      debtCollector,
      employee,
      subject,
      customer,
      bank,
      companyId,
      circularId,
    } = createDepositReceipDto;

    const createVoucherDto: CreateVoucherDto = {
      voucherType: 'DEPOSIT_RECEIPT',
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

      const createdDepositReceip = await tx.depositReceip.create({
        data: {
          depositReceipType,
          reason,
          DebtCollector: debtCollector
            ? { connect: { id: debtCollector } }
            : undefined,
          Employee: employee ? { connect: { id: employee } } : undefined,
          Subject: subject ? { connect: { id: subject } } : undefined,
          Customer: customer ? { connect: { id: customer } } : undefined,
          Bank: bank ? { connect: { id: bank } } : undefined,
          Company: { connect: { id: companyId } },
          voucher: { connect: { id: newVoucher.id } },
        },
        include: {
          Company: true,
          Employee: true,
          DebtCollector: true,
          Subject: true,
          Customer: true,
          Bank: true,
          voucher: true,
          DepositReceipItem: true,
        },
      });

      return createdDepositReceip;
    });

    return plainToInstance(ResponseDepositReceipDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const receips = await this.prismaService.depositReceip.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: {
        Company: true,
        Employee: true,
        DebtCollector: true,
        Subject: true,
        Customer: true,
        Bank: true,
        DepositReceipItem: true,
        voucher: true,
      },
    });

    return plainToInstance(ResponseDepositReceipDto, receips, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const receip = await this.prismaService.depositReceip.findUnique({
      where: { id },
      include: {
        Company: true,
        Employee: true,
        DebtCollector: true,
        Subject: true,
        Customer: true,
        Bank: true,
        DepositReceipItem: true,
        voucher: true,
      },
    });

    if (!receip || receip.deletedAt) {
      throw new NotFoundException('Deposit receipt not found');
    }

    return plainToInstance(ResponseDepositReceipDto, receip, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateDepositReceipDto: UpdateDepositReceipDto) {
    const existing = await this.prismaService.depositReceip.findUnique({
      where: { id },
      include: { voucher: true },
    });

    if (!existing || existing.deletedAt) {
      throw new NotFoundException('Deposit receipt not found');
    }

    const {
      depositReceipType,
      postedDate,
      voucherDate,
      voucherNumber,
      reason,
      debtCollector,
      employee,
      subject,
      customer,
      bank,
      circularId,
    } = updateDepositReceipDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      await this.voucherService.updateWithTransaction(
        existing.voucher?.id,
        { voucherDate, postedDate, voucherNumber, circularId },
        tx,
      );

      const updatedDepositReceip = await tx.depositReceip.update({
        where: { id },
        data: {
          depositReceipType,
          reason,
          debtCollector: debtCollector ?? undefined,
          employee: employee ?? undefined,
          subject: subject ?? undefined,
          customer: customer ?? undefined,
          bank: bank ?? undefined,
        },
        include: {
          Company: true,
          Employee: true,
          DebtCollector: true,
          Subject: true,
          Customer: true,
          Bank: true,
          DepositReceipItem: true,
          voucher: true,
        },
      });

      return updatedDepositReceip;
    });

    return plainToInstance(ResponseDepositReceipDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.depositReceip.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Xóa phiếu thu tiền gửi thành công' };
  }
}
