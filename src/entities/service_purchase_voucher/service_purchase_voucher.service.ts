import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicePurchaseVoucherDto } from './dto/create-service_purchase_voucher.dto';
import { UpdateServicePurchaseVoucherDto } from './dto/update-service_purchase_voucher.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseServicePurchaseVoucherDto } from './dto/response-service_purchase_voucher.dto';

@Injectable()
export class ServicePurchaseVoucherService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createServicePurchaseVoucherDto: CreateServicePurchaseVoucherDto,
  ) {
    // Create a new service purchase voucher
    const servicePurchaseVoucher =
      await this.prismaService.servicePurchaseVoucher.create({
        data: createServicePurchaseVoucherDto,
        include: {
          RecipientAccount: true,
          Supplier: true,
          PurchasingStaff: true,
          PaymentAccount: true,
          PaymentTerm: true,
        },
      });

    return plainToInstance(
      ResponseServicePurchaseVoucherDto,
      servicePurchaseVoucher,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findAll() {
    const servicePurchaseVouchers =
      await this.prismaService.servicePurchaseVoucher.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          RecipientAccount: true,
          Supplier: true,
          PurchasingStaff: true,
          PaymentAccount: true,
          PaymentTerm: true,
        },
      });

    return plainToInstance(
      ResponseServicePurchaseVoucherDto,
      servicePurchaseVouchers,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findOne(id: string) {
    const servicePurchaseVoucher =
      await this.prismaService.servicePurchaseVoucher.findUnique({
        where: { id },
        include: {
          RecipientAccount: true,
          Supplier: true,
          PurchasingStaff: true,
          PaymentAccount: true,
          PaymentTerm: true,
        },
      });

    if (!servicePurchaseVoucher || servicePurchaseVoucher.deletedAt) {
      throw new NotFoundException('Không tìm thấy chứng từ mua dịch vụ');
    }

    return plainToInstance(
      ResponseServicePurchaseVoucherDto,
      servicePurchaseVoucher,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async update(
    id: string,
    updateServicePurchaseVoucherDto: UpdateServicePurchaseVoucherDto,
  ) {
    // Check if the service purchase voucher exists
    await this.findOne(id);

    // Update the service purchase voucher
    const updatedServicePurchaseVoucher =
      await this.prismaService.servicePurchaseVoucher.update({
        where: { id },
        data: updateServicePurchaseVoucherDto,
        include: {
          RecipientAccount: true,
          Supplier: true,
          PurchasingStaff: true,
          PaymentAccount: true,
          PaymentTerm: true,
        },
      });

    return plainToInstance(
      ResponseServicePurchaseVoucherDto,
      updatedServicePurchaseVoucher,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the service purchase voucher exists
    await this.findOne(id);

    // Soft delete the service purchase voucher
    await this.prismaService.servicePurchaseVoucher.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa chứng từ mua dịch vụ thành công' };
  }
}
