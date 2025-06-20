import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseVoucherDto } from './dto/create-purchase_voucher.dto';
import { UpdatePurchaseVoucherDto } from './dto/update-purchase_voucher.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponsePurchaseVoucherDto } from './dto/response-purchase_voucher.dto';

@Injectable()
export class PurchaseVoucherService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPurchaseVoucherDto: CreatePurchaseVoucherDto) {
    // Create a new purchase voucher
    const purchaseVoucher = await this.prismaService.purchaseVoucher.create({
      data: createPurchaseVoucherDto,
      include: {
        PaymentTAndC: true,
        Supplier: true,
        PurchasingStaff: true,
        RecipientAccount: true,
        PaymentAccount: true,
        Attached: true,
        PurchaseVoucherItem_PurchaseVoucher: true,
      },
    });

    return plainToInstance(ResponsePurchaseVoucherDto, purchaseVoucher, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const purchaseVouchers = await this.prismaService.purchaseVoucher.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        PaymentTAndC: true,
        Supplier: true,
        PurchasingStaff: true,
        RecipientAccount: true,
        PaymentAccount: true,
        Attached: true,
        PurchaseVoucherItem_PurchaseVoucher: true,
      },
    });

    return plainToInstance(ResponsePurchaseVoucherDto, purchaseVouchers, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const purchaseVoucher = await this.prismaService.purchaseVoucher.findUnique(
      {
        where: { id },
        include: {
          PaymentTAndC: true,
          Supplier: true,
          PurchasingStaff: true,
          RecipientAccount: true,
          PaymentAccount: true,
          Attached: true,
          PurchaseVoucherItem_PurchaseVoucher: true,
        },
      },
    );

    if (!purchaseVoucher || purchaseVoucher.deletedAt) {
      throw new NotFoundException('Không tìm thấy chứng từ mua hàng');
    }

    return plainToInstance(ResponsePurchaseVoucherDto, purchaseVoucher, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updatePurchaseVoucherDto: UpdatePurchaseVoucherDto) {
    // Check if the purchase voucher exists
    await this.findOne(id);

    // Update the purchase voucher
    const updatedPurchaseVoucher =
      await this.prismaService.purchaseVoucher.update({
        where: { id },
        data: updatePurchaseVoucherDto,
        include: {
          PaymentTAndC: true,
          Supplier: true,
          PurchasingStaff: true,
          RecipientAccount: true,
          PaymentAccount: true,
          Attached: true,
          PurchaseVoucherItem_PurchaseVoucher: true,
        },
      });

    return plainToInstance(ResponsePurchaseVoucherDto, updatedPurchaseVoucher, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the purchase voucher exists
    await this.findOne(id);

    // Soft delete the purchase voucher
    await this.prismaService.purchaseVoucher.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa chứng từ mua hàng thành công' };
  }
}
