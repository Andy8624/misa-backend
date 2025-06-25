import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { VoucherService } from '../voucher/voucher.service';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { ResponseServicePurchaseVoucherDto } from './dto/response-service_purchase_voucher.dto';
import { UpdateServicePurchaseVoucherDto } from './dto/update-service_purchase_voucher.dto';
import { CreateServicePurchaseVoucherDto } from './dto/create-service_purchase_voucher.dto';

@Injectable()
export class ServicePurchaseVoucherService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
  ) {}

  async create(createDto: CreateServicePurchaseVoucherDto) {
    const {
      postedDate,
      voucherDate,
      voucherNumber,
      companyId,
      recipientAccount,
      supplier,
      purchasingStaff,
      paymentAccount,
      paymentTerm,
      circularId,
      ...rest
    } = createDto;

    const createVoucherDto: CreateVoucherDto = {
      voucherType: 'SERVICE_PURCHASE',
      voucherDate,
      postedDate,
      voucherNumber,
      companyId,
      circularId,
    };

    const result = await this.prismaService.$transaction(async (tx) => {
      const newVoucher = await this.voucherService.createWithTransaction(
        createVoucherDto,
        tx,
      );

      const created = await tx.servicePurchaseVoucher.create({
        data: {
          ...rest,
          RecipientAccount: recipientAccount
            ? { connect: { id: recipientAccount } }
            : undefined,
          Supplier: supplier ? { connect: { id: supplier } } : undefined,
          PurchasingStaff: purchasingStaff
            ? { connect: { id: purchasingStaff } }
            : undefined,
          PaymentAccount: paymentAccount
            ? { connect: { id: paymentAccount } }
            : undefined,
          PaymentTerm: paymentTerm
            ? { connect: { id: paymentTerm } }
            : undefined,
          company: { connect: { id: companyId } },
          voucher: { connect: { id: newVoucher.id } },
        },
        include: {
          RecipientAccount: true,
          Supplier: true,
          PurchasingStaff: true,
          PaymentAccount: true,
          PaymentTerm: true,
          company: true,
          voucher: true,
        },
      });

      return created;
    });

    return plainToInstance(ResponseServicePurchaseVoucherDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const list = await this.prismaService.servicePurchaseVoucher.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: {
        RecipientAccount: true,
        Supplier: true,
        PurchasingStaff: true,
        PaymentAccount: true,
        PaymentTerm: true,
        company: true,
        voucher: true,
        ServicePurchaseVoucherItem_ServicePurchaseVoucher: true,
      },
    });

    return plainToInstance(ResponseServicePurchaseVoucherDto, list, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const found = await this.prismaService.servicePurchaseVoucher.findUnique({
      where: { id },
      include: {
        RecipientAccount: true,
        Supplier: true,
        PurchasingStaff: true,
        PaymentAccount: true,
        PaymentTerm: true,
        company: true,
        voucher: true,
      },
    });

    if (!found || found.deletedAt) {
      throw new NotFoundException('Service purchase voucher not found');
    }

    return plainToInstance(ResponseServicePurchaseVoucherDto, found, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateDto: UpdateServicePurchaseVoucherDto) {
    const existing = await this.prismaService.servicePurchaseVoucher.findUnique(
      {
        where: { id },
        include: { voucher: true },
      },
    );

    if (!existing || existing.deletedAt) {
      throw new NotFoundException('Service purchase voucher not found');
    }

    const {
      postedDate,
      voucherDate,
      voucherNumber,
      recipientAccount,
      supplier,
      purchasingStaff,
      paymentAccount,
      paymentTerm,
      companyId,
      circularId,
      ...rest
    } = updateDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      await this.voucherService.updateWithTransaction(
        existing.voucher?.id,
        { voucherDate, postedDate, voucherNumber, circularId },
        tx,
      );

      const updated = await tx.servicePurchaseVoucher.update({
        where: { id },
        data: {
          ...rest,
          RecipientAccount: recipientAccount
            ? { connect: { id: recipientAccount } }
            : undefined,
          Supplier: supplier ? { connect: { id: supplier } } : undefined,
          PurchasingStaff: purchasingStaff
            ? { connect: { id: purchasingStaff } }
            : undefined,
          PaymentAccount: paymentAccount
            ? { connect: { id: paymentAccount } }
            : undefined,
          PaymentTerm: paymentTerm
            ? { connect: { id: paymentTerm } }
            : undefined,
          company: { connect: { id: companyId } },
        },
        include: {
          RecipientAccount: true,
          Supplier: true,
          PurchasingStaff: true,
          PaymentAccount: true,
          PaymentTerm: true,
          company: true,
          voucher: true,
        },
      });

      return updated;
    });

    return plainToInstance(ResponseServicePurchaseVoucherDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.servicePurchaseVoucher.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Xóa phiếu mua dịch vụ thành công' };
  }
}
