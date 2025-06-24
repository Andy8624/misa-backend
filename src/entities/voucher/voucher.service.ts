// src/voucher/voucher.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { PrismaService } from 'src/prisma.service'; // Đảm bảo đường dẫn đúng
import { plainToInstance } from 'class-transformer';
import { ResponseVoucherDto } from './dto/response-voucher.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class VoucherService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVoucherDto: CreateVoucherDto) {
    // Tạo một Voucher mới
    const newVoucher = await this.prismaService.voucher.create({
      data: createVoucherDto,
    });

    return plainToInstance(ResponseVoucherDto, newVoucher, {
      excludeExtraneousValues: true,
    });
  }

  async createWithTransaction(
    createVoucherDto: CreateVoucherDto,
    tx: Prisma.TransactionClient, // dùng TransactionClient để nhận tx
  ) {
    // Không dùng plainToInstance ở đây vì thường trả về raw cho service cha xử lý
    return tx.voucher.create({
      data: createVoucherDto,
    });
  }

  async findAll() {
    const vouchers = await this.prismaService.voucher.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Company: true, // Bao gồm thông tin công ty
      },
    });

    return plainToInstance(ResponseVoucherDto, vouchers, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const voucher = await this.prismaService.voucher.findUnique({
      where: { id },
      include: {
        Company: true, // Bao gồm thông tin công ty
      },
    });

    if (!voucher || voucher.deletedAt) {
      throw new NotFoundException('Voucher not found');
    }

    return plainToInstance(ResponseVoucherDto, voucher, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateVoucherDto: UpdateVoucherDto) {
    // Kiểm tra xem voucher có tồn tại không
    await this.findOne(id);

    // Cập nhật voucher
    const updatedVoucher = await this.prismaService.voucher.update({
      where: { id },
      data: updateVoucherDto,
    });

    return plainToInstance(ResponseVoucherDto, updatedVoucher, {
      excludeExtraneousValues: true,
    });
  }

  async updateWithTransaction(
    id: string,
    data: Partial<CreateVoucherDto>,
    tx: Prisma.TransactionClient,
  ) {
    return tx.voucher.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Kiểm tra xem voucher có tồn tại không
    await this.findOne(id);

    // Xóa mềm voucher
    await this.prismaService.voucher.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa voucher thành công' };
  }
}
