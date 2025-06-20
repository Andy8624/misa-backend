import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCashReceipVoucherItemDto } from './dto/create-cash_receip_voucher_item.dto';
import { UpdateCashReceipVoucherItemDto } from './dto/update-cash_receip_voucher_item.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseCashReceipVoucherItemDto } from './dto/response-cash_receip_voucher_item.dto';

@Injectable()
export class CashReceipVoucherItemService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCashReceipVoucherItemDto: CreateCashReceipVoucherItemDto) {
    // Create a new cash receipt voucher item
    const cashReceipVoucherItem =
      await this.prismaService.cashReceipVoucherItem.create({
        data: createCashReceipVoucherItemDto,
        include: {
          CashReceip: true,
          Subject: true,
          DebitAccount: true,
          CreditAccount: true,
          Bank: true,
        },
      });

    return plainToInstance(
      ResponseCashReceipVoucherItemDto,
      cashReceipVoucherItem,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findAll() {
    const cashReceipVoucherItems =
      await this.prismaService.cashReceipVoucherItem.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          CashReceip: true,
          Subject: true,
          DebitAccount: true,
          CreditAccount: true,
          Bank: true,
        },
      });

    return plainToInstance(
      ResponseCashReceipVoucherItemDto,
      cashReceipVoucherItems,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findOne(id: string) {
    const cashReceipVoucherItem =
      await this.prismaService.cashReceipVoucherItem.findUnique({
        where: { id },
        include: {
          CashReceip: true,
          Subject: true,
          DebitAccount: true,
          CreditAccount: true,
          Bank: true,
        },
      });

    if (!cashReceipVoucherItem || cashReceipVoucherItem.deletedAt) {
      throw new NotFoundException('Không tìm thấy chi tiết phiếu thu tiền mặt');
    }

    return plainToInstance(
      ResponseCashReceipVoucherItemDto,
      cashReceipVoucherItem,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async update(
    id: string,
    updateCashReceipVoucherItemDto: UpdateCashReceipVoucherItemDto,
  ) {
    // Check if the cash receipt voucher item exists
    await this.findOne(id);

    // Update the cash receipt voucher item
    const updatedCashReceipVoucherItem =
      await this.prismaService.cashReceipVoucherItem.update({
        where: { id },
        data: updateCashReceipVoucherItemDto,
        include: {
          CashReceip: true,
          Subject: true,
          DebitAccount: true,
          CreditAccount: true,
          Bank: true,
        },
      });

    return plainToInstance(
      ResponseCashReceipVoucherItemDto,
      updatedCashReceipVoucherItem,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the cash receipt voucher item exists
    await this.findOne(id);

    // Soft delete the cash receipt voucher item
    await this.prismaService.cashReceipVoucherItem.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa chi tiết phiếu thu tiền mặt thành công' };
  }
}
