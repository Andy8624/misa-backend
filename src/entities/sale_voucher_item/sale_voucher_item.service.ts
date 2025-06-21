import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleVoucherItemDto } from './dto/create-sale_voucher_item.dto';
import { UpdateSaleVoucherItemDto } from './dto/update-sale_voucher_item.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseSaleVoucherItemDto } from './dto/response-sale_voucher_item.dto';

@Injectable()
export class SaleVoucherItemService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSaleVoucherItemDto: CreateSaleVoucherItemDto) {
    // Create a new sale voucher item
    const saleVoucherItem = await this.prismaService.saleVoucherItem.create({
      data: createSaleVoucherItemDto,
      include: {
        SaleVoucher: true,
        Item: true,
        Unit: true,
        Vat: true,
        Warehouse: true,
        ExpenseAccount: true,
        InventoryAccount: true,
        creditAccount: true,
        debitAccount: true,
        cashAccount: true,
        liabilityAccount: true,
        liabilityAccountOrExpenseAccount: true,
        SaleAccount: true,
        ExportTaxAccount: true,
      },
    });

    return plainToInstance(ResponseSaleVoucherItemDto, saleVoucherItem, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const saleVoucherItems = await this.prismaService.saleVoucherItem.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        SaleVoucher: true,
        Item: true,
        Unit: true,
        Vat: true,
        Warehouse: true,
        ExpenseAccount: true,
        InventoryAccount: true,
        creditAccount: true,
        debitAccount: true,
        cashAccount: true,
        liabilityAccount: true,
        liabilityAccountOrExpenseAccount: true,
        SaleAccount: true,
        ExportTaxAccount: true,
      },
    });

    return plainToInstance(ResponseSaleVoucherItemDto, saleVoucherItems, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const saleVoucherItem = await this.prismaService.saleVoucherItem.findUnique(
      {
        where: { id },
        include: {
          SaleVoucher: true,
          Item: true,
          Unit: true,
          Vat: true,
          Warehouse: true,
          ExpenseAccount: true,
          InventoryAccount: true,
          creditAccount: true,
          debitAccount: true,
          cashAccount: true,
          liabilityAccount: true,
          liabilityAccountOrExpenseAccount: true,
          SaleAccount: true,
          ExportTaxAccount: true,
        },
      },
    );

    if (!saleVoucherItem || saleVoucherItem.deletedAt) {
      throw new NotFoundException('Sales voucher detail not found');
    }

    return plainToInstance(ResponseSaleVoucherItemDto, saleVoucherItem, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateSaleVoucherItemDto: UpdateSaleVoucherItemDto) {
    // Check if the sale voucher item exists
    await this.findOne(id);

    // Update the sale voucher item
    const updatedSaleVoucherItem =
      await this.prismaService.saleVoucherItem.update({
        where: { id },
        data: updateSaleVoucherItemDto,
        include: {
          SaleVoucher: true,
          Item: true,
          Unit: true,
          Vat: true,
          Warehouse: true,
          ExpenseAccount: true,
          InventoryAccount: true,
          creditAccount: true,
          debitAccount: true,
          cashAccount: true,
          liabilityAccount: true,
          liabilityAccountOrExpenseAccount: true,
          SaleAccount: true,
          ExportTaxAccount: true,
        },
      });

    return plainToInstance(ResponseSaleVoucherItemDto, updatedSaleVoucherItem, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the sale voucher item exists
    await this.findOne(id);

    // Soft delete the sale voucher item
    await this.prismaService.saleVoucherItem.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa chi tiết chứng từ bán hàng thành công' };
  }
}
