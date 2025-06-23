import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepositPaymentDto } from './dto/create-deposit_payment.dto';
import { UpdateDepositPaymentDto } from './dto/update-deposit_payment.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseDepositPaymentDto } from './dto/response-deposit_payment.dto';

@Injectable()
export class DepositPaymentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDepositPaymentDto: CreateDepositPaymentDto) {
    // Create a new deposit payment
    const depositPayment = await this.prismaService.depositPayment.create({
      data: createDepositPaymentDto,
      include: {
        Employee: true,
        Bank: true,
        Supplier: true,
        Subject: true,
        Attached: true,
      },
    });

    return plainToInstance(ResponseDepositPaymentDto, depositPayment, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const depositPayments = await this.prismaService.depositPayment.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Employee: true,
        Bank: true,
        Supplier: true,
        Subject: true,
        Attached: true,
        DepositPaymentItem_DepositPayment: true,
      },
    });

    return plainToInstance(ResponseDepositPaymentDto, depositPayments, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const depositPayment = await this.prismaService.depositPayment.findUnique({
      where: { id },
      include: {
        Employee: true,
        Bank: true,
        Supplier: true,
        Subject: true,
        Attached: true,
      },
    });

    if (!depositPayment || depositPayment.deletedAt) {
      throw new NotFoundException('Bank transfer payment voucher not found');
    }

    return plainToInstance(ResponseDepositPaymentDto, depositPayment, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateDepositPaymentDto: UpdateDepositPaymentDto) {
    // Check if the deposit payment exists
    await this.findOne(id);

    // Update the deposit payment
    const updatedDepositPayment =
      await this.prismaService.depositPayment.update({
        where: { id },
        data: updateDepositPaymentDto,
        include: {
          Employee: true,
          Bank: true,
          Supplier: true,
          Subject: true,
          Attached: true,
        },
      });

    return plainToInstance(ResponseDepositPaymentDto, updatedDepositPayment, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the deposit payment exists
    await this.findOne(id);

    // Soft delete the deposit payment
    await this.prismaService.depositPayment.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa phiếu chi tiền gửi thành công' };
  }
}
