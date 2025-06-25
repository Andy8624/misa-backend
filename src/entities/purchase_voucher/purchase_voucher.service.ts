import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseVoucherDto } from './dto/create-purchase_voucher.dto';
import { UpdatePurchaseVoucherDto } from './dto/update-purchase_voucher.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponsePurchaseVoucherDto } from './dto/response-purchase_voucher.dto';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { VoucherService } from '../voucher/voucher.service';

@Injectable()
export class PurchaseVoucherService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
  ) {}
  async create(createDto: CreatePurchaseVoucherDto) {
    const {
      posted_date,
      voucher_date,
      voucher_number,
      companyId,
      payment_t_and_c,
      supplier,
      purchasing_staff,
      recipient_account,
      payment_account,
      circularId,
      ...rest
    } = createDto;

    const createVoucherDto: CreateVoucherDto = {
      voucherType: 'PURCHASE',
      voucherDate: voucher_date,
      postedDate: posted_date,
      voucherNumber: voucher_number,
      companyId,
      circularId,
    };

    const result = await this.prismaService.$transaction(async (tx) => {
      const newVoucher = await this.voucherService.createWithTransaction(
        createVoucherDto,
        tx,
      );

      const created = await tx.purchaseVoucher.create({
        data: {
          ...rest,
          PaymentTAndC: payment_t_and_c
            ? { connect: { id: payment_t_and_c } }
            : undefined,
          Supplier: supplier ? { connect: { id: supplier } } : undefined,
          PurchasingStaff: purchasing_staff
            ? { connect: { id: purchasing_staff } }
            : undefined,
          RecipientAccount: recipient_account
            ? { connect: { id: recipient_account } }
            : undefined,
          PaymentAccount: payment_account
            ? { connect: { id: payment_account } }
            : undefined,
          Company: { connect: { id: companyId } },
          voucher: { connect: { id: newVoucher.id } },
        },
        include: {
          PaymentTAndC: true,
          Supplier: true,
          PurchasingStaff: true,
          RecipientAccount: true,
          PaymentAccount: true,
          Company: true,
          voucher: true,
          PurchaseVoucherItem_PurchaseVoucher: true,
        },
      });

      return created;
    });

    return plainToInstance(ResponsePurchaseVoucherDto, result, {
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
        Company: true,
        voucher: true,
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
          Company: true,
          voucher: true,
          PurchaseVoucherItem_PurchaseVoucher: true,
        },
      },
    );

    if (!purchaseVoucher || purchaseVoucher.deletedAt) {
      throw new NotFoundException('Purchase voucher not found');
    }

    return plainToInstance(ResponsePurchaseVoucherDto, purchaseVoucher, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updatePurchaseVoucherDto: UpdatePurchaseVoucherDto) {
    const {
      posted_date,
      voucher_date,
      voucher_number,
      companyId,
      payment_t_and_c,
      supplier,
      purchasing_staff,
      recipient_account,
      payment_account,
      circularId,
      ...rest
    } = updatePurchaseVoucherDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      const existing = await tx.purchaseVoucher.findUnique({
        where: { id },
        include: { voucher: true },
      });

      if (!existing || existing.deletedAt) {
        throw new NotFoundException('Purchase voucher not found');
      }

      await this.voucherService.updateWithTransaction(
        existing.voucher?.id,
        {
          postedDate: posted_date,
          voucherDate: voucher_date,
          voucherNumber: voucher_number,
          circularId,
        },
        tx,
      );

      const updated = await tx.purchaseVoucher.update({
        where: { id },
        data: {
          ...rest,
          PaymentTAndC: payment_t_and_c
            ? { connect: { id: payment_t_and_c } }
            : undefined,
          Supplier: supplier ? { connect: { id: supplier } } : undefined,
          PurchasingStaff: purchasing_staff
            ? { connect: { id: purchasing_staff } }
            : undefined,
          RecipientAccount: recipient_account
            ? { connect: { id: recipient_account } }
            : undefined,
          PaymentAccount: payment_account
            ? { connect: { id: payment_account } }
            : undefined,
          Company: { connect: { id: companyId } },
        },
        include: {
          PaymentTAndC: true,
          Supplier: true,
          PurchasingStaff: true,
          RecipientAccount: true,
          PaymentAccount: true,
          Company: true,
          voucher: true,
          PurchaseVoucherItem_PurchaseVoucher: true,
        },
      });

      return updated;
    });

    return plainToInstance(ResponsePurchaseVoucherDto, result, {
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
