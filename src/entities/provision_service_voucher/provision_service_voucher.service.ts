import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateProvisionServiceVoucherDto } from './dto/create-provision_service_voucher.dto';
import { UpdateProvisionServiceVoucherDto } from './dto/update-provision_service_voucher.dto';
import { ResponseProvisionServiceVoucherDto } from './dto/response-provision_service_voucher.dto';
import { VoucherService } from '../voucher/voucher.service';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';

@Injectable()
export class ProvisionServiceVoucherService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
  ) {}
  async create(createDto: CreateProvisionServiceVoucherDto) {
    const {
      postDate,
      voucherDate,
      voucherNumber,
      companyId,
      paymentTAndC,
      cash_receipt_customer_id,
      cash_receipt_back_account,
      cashReceiptStoreperson,
      debtVoucherCustomer,
      debtVoucherStoreperson,
      invoiceCustomer,
      cash_receipt_voucher_customer_id,
      cash_receipt_voucher_storeperson,
      customer,
      ...rest
    } = createDto;

    const createVoucherDto: CreateVoucherDto = {
      voucherType: 'PROVISION_SERVICE',
      postedDate: postDate,
      voucherDate,
      voucherNumber,
      companyId,
    };

    const result = await this.prismaService.$transaction(async (tx) => {
      const newVoucher = await this.voucherService.createWithTransaction(
        createVoucherDto,
        tx,
      );

      const created = await tx.provisionServiceVoucher.create({
        data: {
          ...rest,
          PaymentTAndC: paymentTAndC
            ? { connect: { id: paymentTAndC } }
            : undefined,
          CashReceiptCustomer: cash_receipt_customer_id
            ? { connect: { id: cash_receipt_customer_id } }
            : undefined,
          CashReceiptBankAccount: cash_receipt_back_account
            ? { connect: { id: cash_receipt_back_account } }
            : undefined,
          CashReceiptStoreperson: cashReceiptStoreperson
            ? { connect: { id: cashReceiptStoreperson } }
            : undefined,
          DebtVoucherCustomer: debtVoucherCustomer
            ? { connect: { id: debtVoucherCustomer } }
            : undefined,
          DebtVoucherStoreperson: debtVoucherStoreperson
            ? { connect: { id: debtVoucherStoreperson } }
            : undefined,
          InvoiceCustomer: invoiceCustomer
            ? { connect: { id: invoiceCustomer } }
            : undefined,
          CashReceiptVoucherCustomer: cash_receipt_voucher_customer_id
            ? { connect: { id: cash_receipt_voucher_customer_id } }
            : undefined,
          CashReceiptVoucherStoreperson: cash_receipt_voucher_storeperson
            ? { connect: { id: cash_receipt_voucher_storeperson } }
            : undefined,
          Customer: customer ? { connect: { id: customer } } : undefined,
          Company: { connect: { id: companyId } },
          voucher: { connect: { id: newVoucher.id } },
        },
        include: {
          PaymentTAndC: true,
          CashReceiptCustomer: true,
          CashReceiptBankAccount: true,
          CashReceiptStoreperson: true,
          DebtVoucherCustomer: true,
          DebtVoucherStoreperson: true,
          InvoiceCustomer: true,
          CashReceiptVoucherCustomer: true,
          CashReceiptVoucherStoreperson: true,
          Customer: true,
          Company: true,
          voucher: true,
        },
      });

      return created;
    });

    return plainToInstance(ResponseProvisionServiceVoucherDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const vouchers = await this.prismaService.provisionServiceVoucher.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: {
        PaymentTAndC: true,
        CashReceiptCustomer: true,
        CashReceiptBankAccount: true,
        CashReceiptStoreperson: true,
        DebtVoucherCustomer: true,
        DebtVoucherStoreperson: true,
        InvoiceCustomer: true,
        CashReceiptVoucherCustomer: true,
        CashReceiptVoucherStoreperson: true,
        Customer: true,
        voucher: true,
        Company: true,
      },
    });

    return plainToInstance(ResponseProvisionServiceVoucherDto, vouchers, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const voucher = await this.prismaService.provisionServiceVoucher.findUnique(
      {
        where: { id },
        include: {
          PaymentTAndC: true,
          CashReceiptCustomer: true,
          CashReceiptBankAccount: true,
          CashReceiptStoreperson: true,
          DebtVoucherCustomer: true,
          DebtVoucherStoreperson: true,
          InvoiceCustomer: true,
          CashReceiptVoucherCustomer: true,
          CashReceiptVoucherStoreperson: true,
          Customer: true,
          voucher: true,
          Company: true,
        },
      },
    );

    if (!voucher || voucher.deletedAt) {
      throw new NotFoundException('Provision service voucher not found');
    }

    return plainToInstance(ResponseProvisionServiceVoucherDto, voucher, {
      excludeExtraneousValues: true,
    });
  }
  async update(id: string, updateDto: UpdateProvisionServiceVoucherDto) {
    const existing =
      await this.prismaService.provisionServiceVoucher.findUnique({
        where: { id },
        include: { voucher: true },
      });

    if (!existing || existing.deletedAt) {
      throw new NotFoundException('Provision service voucher not found');
    }

    const {
      postDate,
      voucherDate,
      voucherNumber,
      paymentTAndC,
      cash_receipt_customer_id,
      cash_receipt_back_account,
      cashReceiptStoreperson,
      debtVoucherCustomer,
      debtVoucherStoreperson,
      invoiceCustomer,
      cash_receipt_voucher_customer_id,
      cash_receipt_voucher_storeperson,
      customer,
      companyId,
      ...rest
    } = updateDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      await this.voucherService.updateWithTransaction(
        existing.voucher?.id,
        { voucherDate, postedDate: postDate, voucherNumber },
        tx,
      );

      const updated = await tx.provisionServiceVoucher.update({
        where: { id },
        data: {
          ...rest,
          PaymentTAndC: paymentTAndC
            ? { connect: { id: paymentTAndC } }
            : undefined,
          CashReceiptCustomer: cash_receipt_customer_id
            ? { connect: { id: cash_receipt_customer_id } }
            : undefined,
          CashReceiptBankAccount: cash_receipt_back_account
            ? { connect: { id: cash_receipt_back_account } }
            : undefined,
          CashReceiptStoreperson: cashReceiptStoreperson
            ? { connect: { id: cashReceiptStoreperson } }
            : undefined,
          DebtVoucherCustomer: debtVoucherCustomer
            ? { connect: { id: debtVoucherCustomer } }
            : undefined,
          DebtVoucherStoreperson: debtVoucherStoreperson
            ? { connect: { id: debtVoucherStoreperson } }
            : undefined,
          InvoiceCustomer: invoiceCustomer
            ? { connect: { id: invoiceCustomer } }
            : undefined,
          CashReceiptVoucherCustomer: cash_receipt_voucher_customer_id
            ? { connect: { id: cash_receipt_voucher_customer_id } }
            : undefined,
          CashReceiptVoucherStoreperson: cash_receipt_voucher_storeperson
            ? { connect: { id: cash_receipt_voucher_storeperson } }
            : undefined,
          Customer: customer ? { connect: { id: customer } } : undefined,
          Company: companyId ? { connect: { id: companyId } } : undefined,
        },
        include: {
          PaymentTAndC: true,
          CashReceiptCustomer: true,
          CashReceiptBankAccount: true,
          CashReceiptStoreperson: true,
          DebtVoucherCustomer: true,
          DebtVoucherStoreperson: true,
          InvoiceCustomer: true,
          CashReceiptVoucherCustomer: true,
          CashReceiptVoucherStoreperson: true,
          Customer: true,
          Company: true,
          voucher: true,
        },
      });

      return updated;
    });

    return plainToInstance(ResponseProvisionServiceVoucherDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prismaService.provisionServiceVoucher.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { message: 'Xóa phiếu cung cấp dịch vụ thành công' };
  }
}
