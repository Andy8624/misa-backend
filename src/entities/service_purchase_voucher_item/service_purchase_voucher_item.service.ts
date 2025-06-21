import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicePurchaseVoucherItemDto } from './dto/create-service_purchase_voucher_item.dto';
import { UpdateServicePurchaseVoucherItemDto } from './dto/update-service_purchase_voucher_item.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseServicePurchaseVoucherItemDto } from './dto/response-service_purchase_voucher_item.dto';

@Injectable()
export class ServicePurchaseVoucherItemService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createServicePurchaseVoucherItemDto: CreateServicePurchaseVoucherItemDto,
  ) {
    // Create a new service purchase voucher item
    const servicePurchaseVoucherItem =
      await this.prismaService.servicePurchaseVoucherItem.create({
        data: createServicePurchaseVoucherItemDto,
        include: {
          Vat: true,
          Subject: true,
          VatAccount: true,
          Supplier: true,
          creditAccount: true,
          debitAccount: true,
          ItemId: true,
          ServicePurchaseVoucher: true,
          Unit: true,
        },
      });

    return plainToInstance(
      ResponseServicePurchaseVoucherItemDto,
      servicePurchaseVoucherItem,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findAll() {
    const servicePurchaseVoucherItems =
      await this.prismaService.servicePurchaseVoucherItem.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          Vat: true,
          Subject: true,
          VatAccount: true,
          Supplier: true,
          creditAccount: true,
          debitAccount: true,
          ItemId: true,
          ServicePurchaseVoucher: true,
          Unit: true,
        },
      });

    return plainToInstance(
      ResponseServicePurchaseVoucherItemDto,
      servicePurchaseVoucherItems,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findOne(id: string) {
    const servicePurchaseVoucherItem =
      await this.prismaService.servicePurchaseVoucherItem.findUnique({
        where: { id },
        include: {
          Vat: true,
          Subject: true,
          VatAccount: true,
          Supplier: true,
          creditAccount: true,
          debitAccount: true,
          ItemId: true,
          ServicePurchaseVoucher: true,
          Unit: true,
        },
      });

    if (!servicePurchaseVoucherItem || servicePurchaseVoucherItem.deletedAt) {
      throw new NotFoundException('Service purchase voucher detail not found');
    }

    return plainToInstance(
      ResponseServicePurchaseVoucherItemDto,
      servicePurchaseVoucherItem,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async update(
    id: string,
    updateServicePurchaseVoucherItemDto: UpdateServicePurchaseVoucherItemDto,
  ) {
    // Check if the service purchase voucher item exists
    await this.findOne(id);

    // Update the service purchase voucher item
    const updatedServicePurchaseVoucherItem =
      await this.prismaService.servicePurchaseVoucherItem.update({
        where: { id },
        data: updateServicePurchaseVoucherItemDto,
        include: {
          Vat: true,
          Subject: true,
          VatAccount: true,
          Supplier: true,
          creditAccount: true,
          debitAccount: true,
          ItemId: true,
          ServicePurchaseVoucher: true,
          Unit: true,
        },
      });

    return plainToInstance(
      ResponseServicePurchaseVoucherItemDto,
      updatedServicePurchaseVoucherItem,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the service purchase voucher item exists
    await this.findOne(id);

    // Soft delete the service purchase voucher item
    await this.prismaService.servicePurchaseVoucherItem.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa chi tiết chứng từ mua dịch vụ thành công' };
  }
}
