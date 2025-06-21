import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVoucherAccountEntryDto } from './dto/create-voucher_account_entry.dto';
import { UpdateVoucherAccountEntryDto } from './dto/update-voucher_account_entry.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseVoucherAccountEntryDto } from './dto/response-voucher_account_entry.dto';

@Injectable()
export class VoucherAccountEntryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVoucherAccountEntryDto: CreateVoucherAccountEntryDto) {
    // Create a new voucher account entry
    const voucherAccountEntry =
      await this.prismaService.voucherAccountEntry.create({
        data: createVoucherAccountEntryDto,
        include: {
          ItemId: true,
          creditAccount: true,
          debitAccount: true,
          Subject: true,
          Unit: true,
          VatAccount: true,
          Supplier: true,
        },
      });

    return plainToInstance(
      ResponseVoucherAccountEntryDto,
      voucherAccountEntry,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findAll() {
    const voucherAccountEntries =
      await this.prismaService.voucherAccountEntry.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          ItemId: true,
          creditAccount: true,
          debitAccount: true,
          Subject: true,
          Unit: true,
          VatAccount: true,
          Supplier: true,
        },
      });

    return plainToInstance(
      ResponseVoucherAccountEntryDto,
      voucherAccountEntries,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findOne(id: string) {
    const voucherAccountEntry =
      await this.prismaService.voucherAccountEntry.findUnique({
        where: { id },
        include: {
          ItemId: true,
          creditAccount: true,
          debitAccount: true,
          Subject: true,
          Unit: true,
          VatAccount: true,
          Supplier: true,
        },
      });

    if (!voucherAccountEntry || voucherAccountEntry.deletedAt) {
      throw new NotFoundException('Voucher entry not found');
    }

    return plainToInstance(
      ResponseVoucherAccountEntryDto,
      voucherAccountEntry,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async update(
    id: string,
    updateVoucherAccountEntryDto: UpdateVoucherAccountEntryDto,
  ) {
    // Check if the voucher account entry exists
    await this.findOne(id);

    // Update the voucher account entry
    const updatedVoucherAccountEntry =
      await this.prismaService.voucherAccountEntry.update({
        where: { id },
        data: updateVoucherAccountEntryDto,
        include: {
          ItemId: true,
          creditAccount: true,
          debitAccount: true,
          Subject: true,
          Unit: true,
          VatAccount: true,
          Supplier: true,
        },
      });

    return plainToInstance(
      ResponseVoucherAccountEntryDto,
      updatedVoucherAccountEntry,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the voucher account entry exists
    await this.findOne(id);

    // Soft delete the voucher account entry
    await this.prismaService.voucherAccountEntry.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa bút toán chứng từ thành công' };
  }
}
