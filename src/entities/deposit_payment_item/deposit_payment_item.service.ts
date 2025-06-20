import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepositPaymentItemDto } from './dto/create-deposit_payment_item.dto';
import { UpdateDepositPaymentItemDto } from './dto/update-deposit_payment_item.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseDepositPaymentItemDto } from './dto/response-deposit_payment_item.dto';

@Injectable()
export class DepositPaymentItemService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDepositPaymentItemDto: CreateDepositPaymentItemDto) {
    // Create a new deposit payment item
    const depositPaymentItem =
      await this.prismaService.depositPaymentItem.create({
        data: createDepositPaymentItemDto,
        include: {
          DepositPayment: true,
          Subject: true,
          creditAccount: true,
          debitAccount: true,
        },
      });

    return plainToInstance(ResponseDepositPaymentItemDto, depositPaymentItem, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const depositPaymentItems =
      await this.prismaService.depositPaymentItem.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          DepositPayment: true,
          Subject: true,
          creditAccount: true,
          debitAccount: true,
        },
      });

    return plainToInstance(ResponseDepositPaymentItemDto, depositPaymentItems, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const depositPaymentItem =
      await this.prismaService.depositPaymentItem.findUnique({
        where: { id },
        include: {
          DepositPayment: true,
          Subject: true,
          creditAccount: true,
          debitAccount: true,
        },
      });

    if (!depositPaymentItem || depositPaymentItem.deletedAt) {
      throw new NotFoundException('Không tìm thấy chi tiết phiếu chi tiền gửi');
    }

    return plainToInstance(ResponseDepositPaymentItemDto, depositPaymentItem, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: string,
    updateDepositPaymentItemDto: UpdateDepositPaymentItemDto,
  ) {
    // Check if the deposit payment item exists
    await this.findOne(id);

    // Update the deposit payment item
    const updatedDepositPaymentItem =
      await this.prismaService.depositPaymentItem.update({
        where: { id },
        data: updateDepositPaymentItemDto,
        include: {
          DepositPayment: true,
          Subject: true,
          creditAccount: true,
          debitAccount: true,
        },
      });

    return plainToInstance(
      ResponseDepositPaymentItemDto,
      updatedDepositPaymentItem,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the deposit payment item exists
    await this.findOne(id);

    // Soft delete the deposit payment item
    await this.prismaService.depositPaymentItem.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa chi tiết phiếu chi tiền gửi thành công' };
  }
}
