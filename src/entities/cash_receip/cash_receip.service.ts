import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCashReceipDto } from './dto/create-cash_receip.dto';
import { UpdateCashReceipDto } from './dto/update-cash_receip.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseCashReceipDto } from './dto/response-cash_receip.dto';
import { VoucherService } from '../voucher/voucher.service';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';

@Injectable()
export class CashReceipService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
  ) {}
  async create(createCashReceipDto: CreateCashReceipDto) {
    const {
      cashReceiptVoucherType,
      payer,
      postedDate,
      voucherDate,
      voucherNumber,
      reason,
      withOriginalVoucher,
      employee,
      subject,
      customer,
      companyId,
    } = createCashReceipDto;

    const createVoucherDto: CreateVoucherDto = {
      voucherType: 'CASH_RECEIPT',
      postedDate,
      voucherDate,
      voucherNumber,
      companyId,
    };

    // Dùng transaction để đảm bảo cả hai thao tác đều thành công hoặc rollback
    const result = await this.prismaService.$transaction(async (tx) => {
      // Tạo voucher
      const newVoucher = await this.voucherService.createWithTransaction(
        createVoucherDto,
        tx,
      );

      // Tạo cash receip và gắn voucher
      const createdCashReceip = await tx.cashReceip.create({
        data: {
          cashReceiptVoucherType,
          payer,
          reason,
          withOriginalVoucher,
          Employee: { connect: { id: employee } },
          Subject: { connect: { id: subject } },
          Customer: { connect: { id: customer } },
          company: { connect: { id: companyId } },
          voucher: { connect: { id: newVoucher.id } },
        },
        include: {
          voucher: true,
          Employee: true,
          Subject: true,
          Customer: true,
        },
      });

      return createdCashReceip;
    });

    return plainToInstance(ResponseCashReceipDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const cashReceips = await this.prismaService.cashReceip.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Employee: true,
        Subject: true,
        Customer: true,
        CashReceipVoucherItem: true,
        voucher: true,
      },
    });

    return plainToInstance(ResponseCashReceipDto, cashReceips, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const cashReceip = await this.prismaService.cashReceip.findUnique({
      where: { id },
      include: {
        Employee: true,
        Subject: true,
        Customer: true,
        voucher: true,
      },
    });

    if (!cashReceip || cashReceip.deletedAt) {
      throw new NotFoundException('Cash receipt voucher not found');
    }

    return plainToInstance(ResponseCashReceipDto, cashReceip, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateCashReceipDto: UpdateCashReceipDto) {
    // Kiểm tra tồn tại
    const existing = await this.prismaService.cashReceip.findUnique({
      where: { id },
      include: { voucher: true },
    });

    if (!existing || existing.deletedAt) {
      throw new NotFoundException('Cash receipt voucher not found');
    }

    const {
      voucherDate,
      postedDate,
      voucherNumber,
      cashReceiptVoucherType,
      payer,
      reason,
      withOriginalVoucher,
      employee,
      subject,
      customer,
    } = updateCashReceipDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      // Update voucher trước
      await this.voucherService.updateWithTransaction(
        existing.voucher.id,
        {
          voucherDate,
          postedDate,
          voucherNumber,
        },
        tx,
      );

      // Update cash receip
      const updatedCashReceip = await tx.cashReceip.update({
        where: { id },
        data: {
          cashReceiptVoucherType,
          payer,
          reason,
          withOriginalVoucher,
          Employee: employee ? { connect: { id: employee } } : undefined,
          Subject: subject ? { connect: { id: subject } } : undefined,
          Customer: customer ? { connect: { id: customer } } : undefined,
        },
        include: {
          Employee: true,
          Subject: true,
          Customer: true,
          voucher: true,
        },
      });

      return updatedCashReceip;
    });

    return plainToInstance(ResponseCashReceipDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the cash receipt exists
    await this.findOne(id);

    // Soft delete the cash receipt
    await this.prismaService.cashReceip.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa phiếu thu tiền mặt thành công' };
  }
}
