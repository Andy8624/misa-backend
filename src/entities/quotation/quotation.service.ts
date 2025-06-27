import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseQuotationDto } from './dto/response-quotation.dto';
import { VoucherService } from '../voucher/voucher.service';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';

@Injectable()
export class QuotationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
  ) {}

  async create(createQuotationDto: CreateQuotationDto) {
    const {
      customerId,
      employeeId,
      contactEmployeeId,
      expiredAt,
      taxCode,
      description,
      // Các thuộc tính dùng để tạo voucher
      companyId,
      postedDate,
      voucherDate,
      voucherNumber,
      circularId,
    } = createQuotationDto;

    const createVoucherDto: CreateVoucherDto = {
      voucherType: 'QUOTATION', // Loại chứng từ là 'QUOTATION'
      voucherDate: voucherDate,
      postedDate: postedDate,
      voucherNumber: voucherNumber,
      companyId: companyId,
      circularId: circularId,
    };

    const result = await this.prismaService.$transaction(async (tx) => {
      // Tạo voucher
      const newVoucher = await this.voucherService.createWithTransaction(
        createVoucherDto,
        tx,
      );

      // Tạo Quotation và gắn voucher
      const createdQuotation = await tx.quotation.create({
        data: {
          expiredAt: expiredAt,
          taxCode: taxCode,
          description: description,
          voucher: { connect: { id: newVoucher.id } }, // Gắn voucher đã tạo
          Customer: customerId ? { connect: { id: customerId } } : undefined,
          Employee: employeeId ? { connect: { id: employeeId } } : undefined,
          ContactEmloyee: contactEmployeeId
            ? { connect: { id: contactEmployeeId } }
            : undefined,
        },
        include: {
          Customer: true,
          Employee: true,
          ContactEmloyee: true,
          voucher: true,
          OrderItem_Quotation: true,
        },
      });

      return createdQuotation;
    });

    return plainToInstance(ResponseQuotationDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const quotations = await this.prismaService.quotation.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Customer: true,
        Employee: true,
        ContactEmloyee: true,
        voucher: true,
      },
    });

    return plainToInstance(ResponseQuotationDto, quotations, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const quotation = await this.prismaService.quotation.findUnique({
      where: { id },
      include: {
        Customer: true,
        Employee: true,
        ContactEmloyee: true,
        voucher: true,
      },
    });

    if (!quotation || quotation.deletedAt) {
      throw new NotFoundException('Quotation not found');
    }

    return plainToInstance(ResponseQuotationDto, quotation, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateQuotationDto: UpdateQuotationDto) {
    // Kiểm tra tồn tại
    const existingQuotation = await this.prismaService.quotation.findUnique({
      where: { id },
      include: { voucher: true },
    });

    if (!existingQuotation || existingQuotation.deletedAt) {
      throw new NotFoundException('Quotation not found or already deleted');
    }

    const {
      // Các thuộc tính của Quotation
      customerId,
      employeeId,
      contactEmployeeId,
      expiredAt,
      taxCode,
      description,
      // Các thuộc tính dùng để cập nhật voucher
      companyId, // Có thể cần để cập nhật voucher nếu voucher có companyId riêng
      postedDate,
      voucherDate,
      voucherNumber,
      circularId,
    } = updateQuotationDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      // Cập nhật voucher trước (chỉ cập nhật các trường được phép thay đổi qua DTO)
      if (existingQuotation.voucher) {
        await this.voucherService.updateWithTransaction(
          existingQuotation.voucher.id,
          {
            voucherDate,
            postedDate,
            voucherNumber,
            companyId, // Cập nhật companyId cho voucher nếu có
            circularId,
          },
          tx,
        );
      }

      // Cập nhật Quotation
      const updatedQuotation = await tx.quotation.update({
        where: { id },
        data: {
          expiredAt: expiredAt,
          taxCode: taxCode,
          description: description,
          // Cập nhật các mối quan hệ nếu ID được cung cấp hoặc xóa nếu được gán null/undefined
          ...(customerId !== undefined && {
            Customer: customerId
              ? { connect: { id: customerId } }
              : { disconnect: true },
          }),
          ...(employeeId !== undefined && {
            Employee: employeeId
              ? { connect: { id: employeeId } }
              : { disconnect: true },
          }),
          ...(contactEmployeeId !== undefined && {
            ContactEmloyee: contactEmployeeId
              ? { connect: { id: contactEmployeeId } }
              : { disconnect: true },
          }),
        },
        include: {
          Customer: true,
          Employee: true,
          ContactEmloyee: true,
          voucher: true,
          OrderItem_Quotation: true,
        },
      });

      return updatedQuotation;
    });

    return plainToInstance(ResponseQuotationDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.quotation.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa báo giá thành công' };
  }
}
