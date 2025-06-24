import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseInvoiceDto } from './dto/response-invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    // Create a new invoice
    const invoice = await this.prismaService.invoice.create({
      data: createInvoiceDto,
      include: {
        ExecutinPerson: true,
      },
    });

    return plainToInstance(ResponseInvoiceDto, invoice, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const invoices = await this.prismaService.invoice.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        ExecutinPerson: true,
      },
    });

    return plainToInstance(ResponseInvoiceDto, invoices, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const invoice = await this.prismaService.invoice.findUnique({
      where: { id },
      include: {
        ExecutinPerson: true,
      },
    });

    if (!invoice || invoice.deletedAt) {
      throw new NotFoundException('Invoice not found');
    }

    return plainToInstance(ResponseInvoiceDto, invoice, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    // Check if the invoice exists
    await this.findOne(id);

    // Update the invoice
    const updatedInvoice = await this.prismaService.invoice.update({
      where: { id },
      data: updateInvoiceDto,
      include: {
        ExecutinPerson: true,
      },
    });

    return plainToInstance(ResponseInvoiceDto, updatedInvoice, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the invoice exists
    await this.findOne(id);

    // Soft delete the invoice
    await this.prismaService.invoice.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa hóa đơn thành công' };
  }

  async getXMLFile(id: string) {
    return 'Get file' + id;
  }
}
