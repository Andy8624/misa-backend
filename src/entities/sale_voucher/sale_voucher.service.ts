import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleVoucherDto } from './dto/create-sale_voucher.dto';
import { UpdateSaleVoucherDto } from './dto/update-sale_voucher.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseSaleVoucherDto } from './dto/response-sale_voucher.dto';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { VoucherService } from '../voucher/voucher.service';

@Injectable()
export class SaleVoucherService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
  ) {}

  async create(createDto: CreateSaleVoucherDto) {
    const {
      posted_date,
      voucher_date,
      voucher_number,
      companyId,
      payment_t_and_c,
      invoice_customer_id,
      invoice_bank_account,
      inventory_out_voucher_customer_id,
      inventory_out_voucher_storeperson,
      debt_voucher_customer_id,
      debt_voucher_storeperson,
      debt_voucher_principal,
      debt_voucher_trustor,
      cash_receipt_customer_id,
      cash_receipt_cash_in_bank_receipt,
      cash_receipt_storeperson,
      cash_receipt_principal,
      cash_receipt_voucher_customer_id,
      cash_receipt_voucher_storeperson,
      cash_receipt_voucher_principal,
      customer,
      circularId,
      ...rest
    } = createDto;

    const createVoucherDto: CreateVoucherDto = {
      voucherType: 'SALE',
      postedDate: posted_date,
      voucherDate: voucher_date,
      voucherNumber: voucher_number,
      companyId,
      circularId,
    };

    const result = await this.prismaService.$transaction(async (tx) => {
      const newVoucher = await this.voucherService.createWithTransaction(
        createVoucherDto,
        tx,
      );

      const created = await tx.saleVoucher.create({
        data: {
          ...rest,
          PaymentTAndC: payment_t_and_c
            ? { connect: { id: payment_t_and_c } }
            : undefined,
          InvoiceCustomer: invoice_customer_id
            ? { connect: { id: invoice_customer_id } }
            : undefined,
          InvoiceBankAccount: invoice_bank_account
            ? { connect: { id: invoice_bank_account } }
            : undefined,
          InventoryOutVoucherCustomer: inventory_out_voucher_customer_id
            ? { connect: { id: inventory_out_voucher_customer_id } }
            : undefined,
          InventoryOutVoucherStorePerson: inventory_out_voucher_storeperson
            ? { connect: { id: inventory_out_voucher_storeperson } }
            : undefined,
          DebtVoucherCustomer: debt_voucher_customer_id
            ? { connect: { id: debt_voucher_customer_id } }
            : undefined,
          DebtVoucherStoreperson: debt_voucher_storeperson
            ? { connect: { id: debt_voucher_storeperson } }
            : undefined,
          DebtVoucherPrincipal: debt_voucher_principal
            ? { connect: { id: debt_voucher_principal } }
            : undefined,
          DebtVoucherTrustor: debt_voucher_trustor
            ? { connect: { id: debt_voucher_trustor } }
            : undefined,
          CashReceiptCustomer: cash_receipt_customer_id
            ? { connect: { id: cash_receipt_customer_id } }
            : undefined,
          CashReceiptCashInBankReceipt: cash_receipt_cash_in_bank_receipt
            ? { connect: { id: cash_receipt_cash_in_bank_receipt } }
            : undefined,
          CashReceiptStoreperson: cash_receipt_storeperson
            ? { connect: { id: cash_receipt_storeperson } }
            : undefined,
          CashReceiptPrincipal: cash_receipt_principal
            ? { connect: { id: cash_receipt_principal } }
            : undefined,
          CashReceiptVoucherCustomer: cash_receipt_voucher_customer_id
            ? { connect: { id: cash_receipt_voucher_customer_id } }
            : undefined,
          CashReceiptVoucherStoreperson: cash_receipt_voucher_storeperson
            ? { connect: { id: cash_receipt_voucher_storeperson } }
            : undefined,
          CashReceiptVoucherPrincipal: cash_receipt_voucher_principal
            ? { connect: { id: cash_receipt_voucher_principal } }
            : undefined,
          Customer: customer ? { connect: { id: customer } } : undefined,
          Company: { connect: { id: companyId } },
          voucher: { connect: { id: newVoucher.id } },
        },
        include: {
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
          Company: true,
          voucher: true,
        },
      });

      return created;
    });

    return plainToInstance(ResponseSaleVoucherDto, result, {
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
        Company: true,
        voucher: true,
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
        Company: true,
        voucher: true,
        SaleVoucherItem_SaleVoucher: true,
      },
    });

    if (!saleVoucher || saleVoucher.deletedAt) {
      throw new NotFoundException('Sales voucher not found');
    }

    return plainToInstance(ResponseSaleVoucherDto, saleVoucher, {
      excludeExtraneousValues: true,
    });
  }
  async update(id: string, updateDto: UpdateSaleVoucherDto) {
    const {
      posted_date,
      voucher_date,
      voucher_number,
      companyId,
      payment_t_and_c,
      invoice_customer_id,
      invoice_bank_account,
      inventory_out_voucher_customer_id,
      inventory_out_voucher_storeperson,
      debt_voucher_customer_id,
      debt_voucher_storeperson,
      debt_voucher_principal,
      debt_voucher_trustor,
      cash_receipt_customer_id,
      cash_receipt_cash_in_bank_receipt,
      cash_receipt_storeperson,
      cash_receipt_principal,
      cash_receipt_voucher_customer_id,
      cash_receipt_voucher_storeperson,
      cash_receipt_voucher_principal,
      customer,
      circularId,
      ...rest
    } = updateDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      const existing = await tx.saleVoucher.findUnique({
        where: { id },
        include: { voucher: true },
      });

      if (!existing || existing.deletedAt) {
        throw new NotFoundException('Sales voucher not found');
      }

      await this.voucherService.updateWithTransaction(
        existing.voucher?.id,
        {
          voucherDate: voucher_date,
          postedDate: posted_date,
          voucherNumber: voucher_number,
          circularId,
        },
        tx,
      );

      const updated = await tx.saleVoucher.update({
        where: { id },
        data: {
          ...rest,
          PaymentTAndC: payment_t_and_c
            ? { connect: { id: payment_t_and_c } }
            : undefined,
          InvoiceCustomer: invoice_customer_id
            ? { connect: { id: invoice_customer_id } }
            : undefined,
          InvoiceBankAccount: invoice_bank_account
            ? { connect: { id: invoice_bank_account } }
            : undefined,
          InventoryOutVoucherCustomer: inventory_out_voucher_customer_id
            ? { connect: { id: inventory_out_voucher_customer_id } }
            : undefined,
          InventoryOutVoucherStorePerson: inventory_out_voucher_storeperson
            ? { connect: { id: inventory_out_voucher_storeperson } }
            : undefined,
          DebtVoucherCustomer: debt_voucher_customer_id
            ? { connect: { id: debt_voucher_customer_id } }
            : undefined,
          DebtVoucherStoreperson: debt_voucher_storeperson
            ? { connect: { id: debt_voucher_storeperson } }
            : undefined,
          DebtVoucherPrincipal: debt_voucher_principal
            ? { connect: { id: debt_voucher_principal } }
            : undefined,
          DebtVoucherTrustor: debt_voucher_trustor
            ? { connect: { id: debt_voucher_trustor } }
            : undefined,
          CashReceiptCustomer: cash_receipt_customer_id
            ? { connect: { id: cash_receipt_customer_id } }
            : undefined,
          CashReceiptCashInBankReceipt: cash_receipt_cash_in_bank_receipt
            ? { connect: { id: cash_receipt_cash_in_bank_receipt } }
            : undefined,
          CashReceiptStoreperson: cash_receipt_storeperson
            ? { connect: { id: cash_receipt_storeperson } }
            : undefined,
          CashReceiptPrincipal: cash_receipt_principal
            ? { connect: { id: cash_receipt_principal } }
            : undefined,
          CashReceiptVoucherCustomer: cash_receipt_voucher_customer_id
            ? { connect: { id: cash_receipt_voucher_customer_id } }
            : undefined,
          CashReceiptVoucherStoreperson: cash_receipt_voucher_storeperson
            ? { connect: { id: cash_receipt_voucher_storeperson } }
            : undefined,
          CashReceiptVoucherPrincipal: cash_receipt_voucher_principal
            ? { connect: { id: cash_receipt_voucher_principal } }
            : undefined,
          Customer: customer ? { connect: { id: customer } } : undefined,
          Company: { connect: { id: companyId } },
        },
        include: {
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
          Company: true,
          voucher: true,
          SaleVoucherItem_SaleVoucher: true,
        },
      });

      return updated;
    });

    return plainToInstance(ResponseSaleVoucherDto, result, {
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
