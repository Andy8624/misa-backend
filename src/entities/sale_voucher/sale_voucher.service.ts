import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleVoucherDto } from './dto/create-sale_voucher.dto';
import { UpdateSaleVoucherDto } from './dto/update-sale_voucher.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseSaleVoucherDto } from './dto/response-sale_voucher.dto';

@Injectable()
export class SaleVoucherService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSaleVoucherDto: CreateSaleVoucherDto) {
    // Create a new sale voucher
    const saleVoucher = await this.prismaService.saleVoucher.create({
      data: createSaleVoucherDto,
      include: {
        Attached: true,
        PaymentTAndC: true,
        InvoiceCustomer: true,
        InvoiceBankAccount: true,
        InventoryOutVoucherCustomer: true,
        InventoryOutVoucherStorePerson: true,
        DebtVoucherCustomer: true,
        DebtVoucherStoreperson: true,
        DebtVoucherPrincipal: true,
        DebtVoucherTrustor: true,
        CashReceiptCustomer: true,
        CashReceiptCashInBankReceipt: true,
        CashReceiptStoreperson: true,
        CashReceiptPrincipal: true,
        CashReceiptVoucherCustomer: true,
        CashReceiptVoucherStoreperson: true,
        CashReceiptVoucherPrincipal: true,
        Customer: true,
        SaleVoucherItem_SaleVoucher: true,
      },
    });

    return plainToInstance(ResponseSaleVoucherDto, saleVoucher, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const saleVouchers = await this.prismaService.saleVoucher.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Attached: true,
        PaymentTAndC: true,
        InvoiceCustomer: true,
        InvoiceBankAccount: true,
        InventoryOutVoucherCustomer: true,
        InventoryOutVoucherStorePerson: true,
        DebtVoucherCustomer: true,
        DebtVoucherStoreperson: true,
        DebtVoucherPrincipal: true,
        DebtVoucherTrustor: true,
        CashReceiptCustomer: true,
        CashReceiptCashInBankReceipt: true,
        CashReceiptStoreperson: true,
        CashReceiptPrincipal: true,
        CashReceiptVoucherCustomer: true,
        CashReceiptVoucherStoreperson: true,
        CashReceiptVoucherPrincipal: true,
        Customer: true,
        SaleVoucherItem_SaleVoucher: true,
      },
    });

    return plainToInstance(ResponseSaleVoucherDto, saleVouchers, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const saleVoucher = await this.prismaService.saleVoucher.findUnique({
      where: { id },
      include: {
        Attached: true,
        PaymentTAndC: true,
        InvoiceCustomer: true,
        InvoiceBankAccount: true,
        InventoryOutVoucherCustomer: true,
        InventoryOutVoucherStorePerson: true,
        DebtVoucherCustomer: true,
        DebtVoucherStoreperson: true,
        DebtVoucherPrincipal: true,
        DebtVoucherTrustor: true,
        CashReceiptCustomer: true,
        CashReceiptCashInBankReceipt: true,
        CashReceiptStoreperson: true,
        CashReceiptPrincipal: true,
        CashReceiptVoucherCustomer: true,
        CashReceiptVoucherStoreperson: true,
        CashReceiptVoucherPrincipal: true,
        Customer: true,
        SaleVoucherItem_SaleVoucher: true,
      },
    });

    if (!saleVoucher || saleVoucher.deletedAt) {
      throw new NotFoundException('Không tìm thấy chứng từ bán hàng');
    }

    return plainToInstance(ResponseSaleVoucherDto, saleVoucher, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateSaleVoucherDto: UpdateSaleVoucherDto) {
    // Check if the sale voucher exists
    await this.findOne(id);

    // Update the sale voucher
    const updatedSaleVoucher = await this.prismaService.saleVoucher.update({
      where: { id },
      data: updateSaleVoucherDto,
      include: {
        Attached: true,
        PaymentTAndC: true,
        InvoiceCustomer: true,
        InvoiceBankAccount: true,
        InventoryOutVoucherCustomer: true,
        InventoryOutVoucherStorePerson: true,
        DebtVoucherCustomer: true,
        DebtVoucherStoreperson: true,
        DebtVoucherPrincipal: true,
        DebtVoucherTrustor: true,
        CashReceiptCustomer: true,
        CashReceiptCashInBankReceipt: true,
        CashReceiptStoreperson: true,
        CashReceiptPrincipal: true,
        CashReceiptVoucherCustomer: true,
        CashReceiptVoucherStoreperson: true,
        CashReceiptVoucherPrincipal: true,
        Customer: true,
        SaleVoucherItem_SaleVoucher: true,
      },
    });

    return plainToInstance(ResponseSaleVoucherDto, updatedSaleVoucher, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the sale voucher exists
    await this.findOne(id);

    // Soft delete the sale voucher
    await this.prismaService.saleVoucher.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa chứng từ bán hàng thành công' };
  }
}
