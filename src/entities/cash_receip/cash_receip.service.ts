import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCashReceipDto } from './dto/create-cash_receip.dto';
import { UpdateCashReceipDto } from './dto/update-cash_receip.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseCashReceipDto } from './dto/response-cash_receip.dto';

@Injectable()
export class CashReceipService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCashReceipDto: CreateCashReceipDto) {
    // Create a new cash receipt
    const cashReceip = await this.prismaService.cashReceip.create({
      data: createCashReceipDto,
      include: {
        EmployeeByType: true,
        Employee: true,
        Subject: true,
        Customer: true,
      },
    });

    return plainToInstance(ResponseCashReceipDto, cashReceip, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const cashReceips = await this.prismaService.cashReceip.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        EmployeeByType: true,
        Employee: true,
        Subject: true,
        Customer: true,
        CashReceipVoucherItem: true,
      },
    });

    return plainToInstance(ResponseCashReceipDto, cashReceips, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const cashReceip = await this.prismaService.cashReceip.findUnique({
      where: { id },
      include: {
        EmployeeByType: true,
        Employee: true,
        Subject: true,
        Customer: true,
      },
    });

    if (!cashReceip || cashReceip.deletedAt) {
      throw new NotFoundException('Cash receipt voucher not found');
    }

    return plainToInstance(ResponseCashReceipDto, cashReceip, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateCashReceipDto: UpdateCashReceipDto) {
    // Check if the cash receipt exists
    await this.findOne(id);

    // Update the cash receipt
    const updatedCashReceip = await this.prismaService.cashReceip.update({
      where: { id },
      data: updateCashReceipDto,
      include: {
        EmployeeByType: true,
        Employee: true,
        Subject: true,
        Customer: true,
      },
    });

    return plainToInstance(ResponseCashReceipDto, updatedCashReceip, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the cash receipt exists
    await this.findOne(id);

    // Soft delete the cash receipt
    await this.prismaService.cashReceip.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa phiếu thu tiền mặt thành công' };
  }
}
