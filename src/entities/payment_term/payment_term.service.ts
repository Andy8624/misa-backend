import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentTermDto } from './dto/create-payment_term.dto';
import { UpdatePaymentTermDto } from './dto/update-payment_term.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponsePaymentTermDto } from './dto/response-payment_term.dto';

@Injectable()
export class PaymentTermService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPaymentTermDto: CreatePaymentTermDto) {
    // Create a new payment term
    const paymentTerm = await this.prismaService.paymentTerms.create({
      data: createPaymentTermDto,
    });

    return plainToInstance(ResponsePaymentTermDto, paymentTerm, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const paymentTerms = await this.prismaService.paymentTerms.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return plainToInstance(ResponsePaymentTermDto, paymentTerms, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const paymentTerm = await this.prismaService.paymentTerms.findUnique({
      where: { id },
    });

    if (!paymentTerm || paymentTerm.deletedAt) {
      throw new NotFoundException('Payment term not found');
    }

    return plainToInstance(ResponsePaymentTermDto, paymentTerm, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updatePaymentTermDto: UpdatePaymentTermDto) {
    // Check if the payment term exists
    await this.findOne(id);

    // Update the payment term
    const updatedPaymentTerm = await this.prismaService.paymentTerms.update({
      where: { id },
      data: updatePaymentTermDto,
    });

    return plainToInstance(ResponsePaymentTermDto, updatedPaymentTerm, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the payment term exists
    await this.findOne(id);

    // Soft delete the payment term
    await this.prismaService.paymentTerms.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa điều khoản thanh toán thành công' };
  }
}
