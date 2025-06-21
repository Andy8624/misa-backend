import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProvisionServiceVoucherItemDto } from './dto/create-provision_service_voucher_item.dto';
import { UpdateProvisionServiceVoucherItemDto } from './dto/update-provision_service_voucher_item.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseProvisionServiceVoucherItemDto } from './dto/response-provision_service_voucher_item.dto';

@Injectable()
export class ProvisionServiceVoucherItemService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createProvisionServiceVoucherItemDto: CreateProvisionServiceVoucherItemDto,
  ) {
    // Create a new provision service voucher item
    const provisionServiceVoucherItem =
      await this.prismaService.provisionServiceVoucherItem.create({
        data: createProvisionServiceVoucherItemDto,
        include: {
          ProvisionServiceVoucher: true,
          Item: true,
          Unit: true,
          Vat: true,
          creditAccount: true,
          debitAccount: true,
          discountAccount: true,
          vatAccount: true,
        },
      });

    return plainToInstance(
      ResponseProvisionServiceVoucherItemDto,
      provisionServiceVoucherItem,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findAll() {
    const provisionServiceVoucherItems =
      await this.prismaService.provisionServiceVoucherItem.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          ProvisionServiceVoucher: true,
          Item: true,
          Unit: true,
          Vat: true,
          creditAccount: true,
          debitAccount: true,
          discountAccount: true,
          vatAccount: true,
        },
      });

    return plainToInstance(
      ResponseProvisionServiceVoucherItemDto,
      provisionServiceVoucherItems,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findOne(id: string) {
    const provisionServiceVoucherItem =
      await this.prismaService.provisionServiceVoucherItem.findUnique({
        where: { id },
        include: {
          ProvisionServiceVoucher: true,
          Item: true,
          Unit: true,
          Vat: true,
          creditAccount: true,
          debitAccount: true,
          discountAccount: true,
          vatAccount: true,
        },
      });

    if (!provisionServiceVoucherItem || provisionServiceVoucherItem.deletedAt) {
      throw new NotFoundException('Service receipt detail not found');
    }

    return plainToInstance(
      ResponseProvisionServiceVoucherItemDto,
      provisionServiceVoucherItem,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async update(
    id: string,
    updateProvisionServiceVoucherItemDto: UpdateProvisionServiceVoucherItemDto,
  ) {
    // Check if the provision service voucher item exists
    await this.findOne(id);

    // Update the provision service voucher item
    const updatedProvisionServiceVoucherItem =
      await this.prismaService.provisionServiceVoucherItem.update({
        where: { id },
        data: updateProvisionServiceVoucherItemDto,
        include: {
          ProvisionServiceVoucher: true,
          Item: true,
          Unit: true,
          Vat: true,
          creditAccount: true,
          debitAccount: true,
          discountAccount: true,
          vatAccount: true,
        },
      });

    return plainToInstance(
      ResponseProvisionServiceVoucherItemDto,
      updatedProvisionServiceVoucherItem,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the provision service voucher item exists
    await this.findOne(id);

    // Soft delete the provision service voucher item
    await this.prismaService.provisionServiceVoucherItem.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa chi tiết chứng từ cung cấp dịch vụ thành công' };
  }
}
