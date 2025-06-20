import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseVoucherItemDto } from './dto/create-purchase_voucher_item.dto';
import { UpdatePurchaseVoucherItemDto } from './dto/update-purchase_voucher_item.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponsePurchaseVoucherItemDto } from './dto/response-purchase_voucher_item.dto';

@Injectable()
export class PurchaseVoucherItemService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPurchaseVoucherItemDto: CreatePurchaseVoucherItemDto) {
    // Create a new purchase voucher item
    const purchaseVoucherItem =
      await this.prismaService.purchaseVoucherItem.create({
        data: createPurchaseVoucherItemDto,
        include: {
          PurchaseVoucher: true,
          Item: true,
          CostAccount: true,
          AccountPayable: true,
          CashAccount: true,
          InventoryAccount: true,
          Unit: true,
          Vat: true,
          VatAccount: true,
          GroupOfPurchaseGood: true,
          Warehouse: true,
          ImportTaxAccount: true,
          SpecialConsumptionTaxAccount: true,
          VatCorrespondingAccount: true,
        },
      });

    return plainToInstance(
      ResponsePurchaseVoucherItemDto,
      purchaseVoucherItem,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findAll() {
    const purchaseVoucherItems =
      await this.prismaService.purchaseVoucherItem.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          PurchaseVoucher: true,
          Item: true,
          CostAccount: true,
          AccountPayable: true,
          CashAccount: true,
          InventoryAccount: true,
          Unit: true,
          Vat: true,
          VatAccount: true,
          GroupOfPurchaseGood: true,
          Warehouse: true,
          ImportTaxAccount: true,
          SpecialConsumptionTaxAccount: true,
          VatCorrespondingAccount: true,
        },
      });

    return plainToInstance(
      ResponsePurchaseVoucherItemDto,
      purchaseVoucherItems,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findOne(id: string) {
    const purchaseVoucherItem =
      await this.prismaService.purchaseVoucherItem.findUnique({
        where: { id },
        include: {
          PurchaseVoucher: true,
          Item: true,
          CostAccount: true,
          AccountPayable: true,
          CashAccount: true,
          InventoryAccount: true,
          Unit: true,
          Vat: true,
          VatAccount: true,
          GroupOfPurchaseGood: true,
          Warehouse: true,
          ImportTaxAccount: true,
          SpecialConsumptionTaxAccount: true,
          VatCorrespondingAccount: true,
        },
      });

    if (!purchaseVoucherItem || purchaseVoucherItem.deletedAt) {
      throw new NotFoundException('Không tìm thấy chi tiết chứng từ mua hàng');
    }

    return plainToInstance(
      ResponsePurchaseVoucherItemDto,
      purchaseVoucherItem,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async update(
    id: string,
    updatePurchaseVoucherItemDto: UpdatePurchaseVoucherItemDto,
  ) {
    // Check if the purchase voucher item exists
    await this.findOne(id);

    // Update the purchase voucher item
    const updatedPurchaseVoucherItem =
      await this.prismaService.purchaseVoucherItem.update({
        where: { id },
        data: updatePurchaseVoucherItemDto,
        include: {
          PurchaseVoucher: true,
          Item: true,
          CostAccount: true,
          AccountPayable: true,
          CashAccount: true,
          InventoryAccount: true,
          Unit: true,
          Vat: true,
          VatAccount: true,
          GroupOfPurchaseGood: true,
          Warehouse: true,
          ImportTaxAccount: true,
          SpecialConsumptionTaxAccount: true,
          VatCorrespondingAccount: true,
        },
      });

    return plainToInstance(
      ResponsePurchaseVoucherItemDto,
      updatedPurchaseVoucherItem,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the purchase voucher item exists
    await this.findOne(id);

    // Soft delete the purchase voucher item
    await this.prismaService.purchaseVoucherItem.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa chi tiết chứng từ mua hàng thành công' };
  }
}
