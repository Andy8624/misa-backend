import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseCashPaymentDto } from './dto/response-cash-payment.dto';
import { CreateCashPaymentDto } from './dto/create-cash-payment.dto';
import { UpdateCashPaymentDto } from './dto/update-cash-payment.dto';

@Injectable()
export class CashPaymentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCashPaymentDto: CreateCashPaymentDto) {
    // Create a new cash payment
    const cashPayment = await this.prismaService.cashPayment.create({
      data: createCashPaymentDto,
      include: {
        Employee: true,
        Subject: true,
        Supplier: true,
        CashPaymentVoucherItem: true,
      },
    });

    return plainToInstance(ResponseCashPaymentDto, cashPayment, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const cashPayments = await this.prismaService.cashPayment.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Employee: true,
        Subject: true,
        Supplier: true,
        CashPaymentVoucherItem: true,
      },
    });

    return plainToInstance(ResponseCashPaymentDto, cashPayments, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const cashPayment = await this.prismaService.cashPayment.findUnique({
      where: { id },
      include: {
        Employee: true,
        Subject: true,
        Supplier: true,
        CashPaymentVoucherItem: true,
      },
    });

    if (!cashPayment || cashPayment.deletedAt) {
      throw new NotFoundException('Cash payment voucher not found');
    }

    return plainToInstance(ResponseCashPaymentDto, cashPayment, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateCashPaymentDto: UpdateCashPaymentDto) {
    // Check if the cash payment exists
    await this.findOne(id);

    // Update the cash payment
    const updatedCashPayment = await this.prismaService.cashPayment.update({
      where: { id },
      data: updateCashPaymentDto,
      include: {
        Employee: true,
        Subject: true,
        Supplier: true,
        CashPaymentVoucherItem: true,
      },
    });

    return plainToInstance(ResponseCashPaymentDto, updatedCashPayment, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the cash payment exists
    await this.findOne(id);

    // Soft delete the cash payment
    await this.prismaService.cashPayment.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa phiếu chi tiền mặt thành công' };
  }
}
