import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateCashPaymentVoucherItemDto } from './dto/create-cash-payment-voucher-item.dto';
import { ResponseCashPaymentVoucherItemDto } from './dto/response-cash-payment-voucher-item.dto';
import { UpdateCashPaymentVoucherItemDto } from './dto/update-cash-payment-voucher-item.dto';

@Injectable()
export class CashPaymentVoucherItemService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createCashPaymentVoucherItemDto: CreateCashPaymentVoucherItemDto,
  ) {
    // Create a new cash payment voucher item
    const cashPaymentVoucherItem =
      await this.prismaService.cashPaymentVoucherItem.create({
        data: createCashPaymentVoucherItemDto,
        include: {
          CashPayment: true,
          Subject: true,
          DebitAccount: true,
          CreditAccount: true,
          Bank: true,
        },
      });

    return plainToInstance(
      ResponseCashPaymentVoucherItemDto,
      cashPaymentVoucherItem,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findAll() {
    const cashPaymentVoucherItems =
      await this.prismaService.cashPaymentVoucherItem.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          CashPayment: true,
          Subject: true,
          DebitAccount: true,
          CreditAccount: true,
          Bank: true,
        },
      });

    return plainToInstance(
      ResponseCashPaymentVoucherItemDto,
      cashPaymentVoucherItems,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findOne(id: string) {
    const cashPaymentVoucherItem =
      await this.prismaService.cashPaymentVoucherItem.findUnique({
        where: { id },
        include: {
          CashPayment: true,
          Subject: true,
          DebitAccount: true,
          CreditAccount: true,
          Bank: true,
        },
      });

    if (!cashPaymentVoucherItem || cashPaymentVoucherItem.deletedAt) {
      throw new NotFoundException('Cash payment voucher not found');
    }

    return plainToInstance(
      ResponseCashPaymentVoucherItemDto,
      cashPaymentVoucherItem,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async update(
    id: string,
    updateCashPaymentVoucherItemDto: UpdateCashPaymentVoucherItemDto,
  ) {
    // Check if the cash payment voucher item exists
    await this.findOne(id);

    // Update the cash payment voucher item
    const updatedCashPaymentVoucherItem =
      await this.prismaService.cashPaymentVoucherItem.update({
        where: { id },
        data: updateCashPaymentVoucherItemDto,
        include: {
          CashPayment: true,
          Subject: true,
          DebitAccount: true,
          CreditAccount: true,
          Bank: true,
        },
      });

    return plainToInstance(
      ResponseCashPaymentVoucherItemDto,
      updatedCashPaymentVoucherItem,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the cash payment voucher item exists
    await this.findOne(id);

    // Soft delete the cash payment voucher item
    await this.prismaService.cashPaymentVoucherItem.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa chi tiết phiếu chi tiền mặt thành công' };
  }
}
