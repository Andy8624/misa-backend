import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepositReceipItemDto } from './dto/create-deposit_receip_item.dto';
import { UpdateDepositReceipItemDto } from './dto/update-deposit_receip_item.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseDepositReceipItemDto } from './dto/response-deposit_receip_item.dto';

@Injectable()
export class DepositReceipItemService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDepositReceipItemDto: CreateDepositReceipItemDto) {
    // Create a new deposit receipt item
    const depositReceipItem = await this.prismaService.depositReceipItem.create(
      {
        data: createDepositReceipItemDto,
        include: {
          DepositReceip: true,
          Subject: true,
          creditAccount: true,
          debitAccount: true,
        },
      },
    );

    return plainToInstance(ResponseDepositReceipItemDto, depositReceipItem, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const depositReceipItems =
      await this.prismaService.depositReceipItem.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          DepositReceip: true,
          Subject: true,
          creditAccount: true,
          debitAccount: true,
        },
      });

    return plainToInstance(ResponseDepositReceipItemDto, depositReceipItems, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const depositReceipItem =
      await this.prismaService.depositReceipItem.findUnique({
        where: { id },
        include: {
          DepositReceip: true,
          Subject: true,
          creditAccount: true,
          debitAccount: true,
        },
      });

    if (!depositReceipItem || depositReceipItem.deletedAt) {
      throw new NotFoundException('Deposit voucher detail not found');
    }

    return plainToInstance(ResponseDepositReceipItemDto, depositReceipItem, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: string,
    updateDepositReceipItemDto: UpdateDepositReceipItemDto,
  ) {
    // Check if the deposit receipt item exists
    await this.findOne(id);

    // Update the deposit receipt item
    const updatedDepositReceipItem =
      await this.prismaService.depositReceipItem.update({
        where: { id },
        data: updateDepositReceipItemDto,
        include: {
          DepositReceip: true,
          Subject: true,
          creditAccount: true,
          debitAccount: true,
        },
      });

    return plainToInstance(
      ResponseDepositReceipItemDto,
      updatedDepositReceipItem,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the deposit receipt item exists
    await this.findOne(id);

    // Soft delete the deposit receipt item
    await this.prismaService.depositReceipItem.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa chi tiết phiếu gửi tiền thành công' };
  }
}
