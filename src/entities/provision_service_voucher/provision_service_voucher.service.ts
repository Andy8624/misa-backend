import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProvisionServiceVoucherDto } from './dto/create-provision_service_voucher.dto';
import { UpdateProvisionServiceVoucherDto } from './dto/update-provision_service_voucher.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseProvisionServiceVoucherDto } from './dto/response-provision_service_voucher.dto';

@Injectable()
export class ProvisionServiceVoucherService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createProvisionServiceVoucherDto: CreateProvisionServiceVoucherDto,
  ) {
    // Create a new provision service voucher
    const provisionServiceVoucher =
      await this.prismaService.provisionServiceVoucher.create({
        data: createProvisionServiceVoucherDto,
        include: {
          Attached: true,
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
        },
      });

    return plainToInstance(
      ResponseProvisionServiceVoucherDto,
      provisionServiceVoucher,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findAll() {
    const provisionServiceVouchers =
      await this.prismaService.provisionServiceVoucher.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          Attached: true,
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
        },
      });

    return plainToInstance(
      ResponseProvisionServiceVoucherDto,
      provisionServiceVouchers,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findOne(id: string) {
    const provisionServiceVoucher =
      await this.prismaService.provisionServiceVoucher.findUnique({
        where: { id },
        include: {
          Attached: true,
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
        },
      });

    if (!provisionServiceVoucher || provisionServiceVoucher.deletedAt) {
      throw new NotFoundException('Không tìm thấy chứng từ cung cấp dịch vụ');
    }

    return plainToInstance(
      ResponseProvisionServiceVoucherDto,
      provisionServiceVoucher,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async update(
    id: string,
    updateProvisionServiceVoucherDto: UpdateProvisionServiceVoucherDto,
  ) {
    // Check if the provision service voucher exists
    await this.findOne(id);

    // Update the provision service voucher
    const updatedProvisionServiceVoucher =
      await this.prismaService.provisionServiceVoucher.update({
        where: { id },
        data: updateProvisionServiceVoucherDto,
        include: {
          Attached: true,
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
        },
      });

    return plainToInstance(
      ResponseProvisionServiceVoucherDto,
      updatedProvisionServiceVoucher,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the provision service voucher exists
    await this.findOne(id);

    // Soft delete the provision service voucher
    await this.prismaService.provisionServiceVoucher.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa chứng từ cung cấp dịch vụ thành công' };
  }
}
