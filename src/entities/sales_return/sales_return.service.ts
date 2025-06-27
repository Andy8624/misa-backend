import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalesReturnDto } from './dto/create-sales_return.dto';
import { UpdateSalesReturnDto } from './dto/update-sales_return.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseSalesReturnDto } from './dto/response-sales_return.dto';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { VoucherService } from '../voucher/voucher.service';

@Injectable()
export class SalesReturnService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
  ) {}

  async create(createSalesReturnDto: CreateSalesReturnDto) {
    const {
      voucherGroup,
      voucherTypeHigh,
      voucherTypeMedium,
      isAlsoInventoryReceipt,
      invoiceLookupCode,
      invoiceLookupPath,
      description,
      customerId,
      employeeId,
      departmentId,
      withOriginalVoucher,
      deliveryName,
      recieptName,
      invoiceNo,
      invoiceSymbol,
      // Các thuộc tính dùng để tạo voucher
      companyId,
      postedDate,
      voucherDate,
      voucherNumber,
      circularId,
    } = createSalesReturnDto;

    const createVoucherDto: CreateVoucherDto = {
      voucherType: 'SALES_RETURN', // Loại chứng từ là 'SALES_RETURN'
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

      // Tạo SalesReturn và gắn voucher
      const createdSalesReturn = await tx.salesReturn.create({
        data: {
          voucherGroup: voucherGroup,
          voucherTypeHigh: voucherTypeHigh,
          voucherTypeMedium: voucherTypeMedium,
          isAlsoInventoryReceipt: isAlsoInventoryReceipt,
          invoiceLookupCode: invoiceLookupCode,
          invoiceLookupPath: invoiceLookupPath,
          description: description,
          withOriginalVoucher: withOriginalVoucher,
          deliveryName: deliveryName,
          recieptName: recieptName,
          invoiceNo: invoiceNo,
          invoiceSymbol: invoiceSymbol,
          voucher: { connect: { id: newVoucher.id } }, // Gắn voucher đã tạo
          ...(customerId && { Customer: { connect: { id: customerId } } }),
          ...(employeeId && { Employee: { connect: { id: employeeId } } }),
          ...(departmentId && {
            Department: { connect: { id: departmentId } },
          }),
        },
        include: {
          Customer: true,
          Employee: true,
          Department: true,
          voucher: true,
          OtherItem_SalesReturn: true,
          SalesReturnCost_SalesReturn: true,
        },
      });

      return createdSalesReturn;
    });

    return plainToInstance(ResponseSalesReturnDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const salesReturns = await this.prismaService.salesReturn.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Customer: true,
        Employee: true,
        Department: true,
        voucher: true,
        SalesReturnCost_SalesReturn: true,
        OtherItem_SalesReturn: true,
      },
    });

    return plainToInstance(ResponseSalesReturnDto, salesReturns, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const salesReturn = await this.prismaService.salesReturn.findUnique({
      where: { id },
      include: {
        Customer: true,
        Employee: true,
        Department: true,
        voucher: true,
        SalesReturnCost_SalesReturn: true,
        OtherItem_SalesReturn: true,
      },
    });

    if (!salesReturn || salesReturn.deletedAt) {
      throw new NotFoundException('SalesReturn not found');
    }

    return plainToInstance(ResponseSalesReturnDto, salesReturn, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateSalesReturnDto: UpdateSalesReturnDto) {
    // Check if the record exists
    const existingSalesReturn = await this.prismaService.salesReturn.findUnique(
      {
        where: { id },
        include: { voucher: true },
      },
    );

    if (!existingSalesReturn || existingSalesReturn.deletedAt) {
      throw new NotFoundException('Sales return not found or already deleted');
    }

    const {
      voucherGroup,
      voucherTypeHigh,
      voucherTypeMedium,
      isAlsoInventoryReceipt,
      invoiceLookupCode,
      invoiceLookupPath,
      description,
      customerId,
      employeeId,
      departmentId,
      withOriginalVoucher,
      deliveryName,
      recieptName,
      invoiceNo,
      invoiceSymbol,
      // Properties used to update the voucher
      companyId,
      postedDate,
      voucherDate,
      voucherNumber,
      circularId,
    } = updateSalesReturnDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      // Update the voucher first
      if (existingSalesReturn.voucher) {
        await this.voucherService.updateWithTransaction(
          existingSalesReturn.voucher.id,
          {
            voucherDate,
            postedDate,
            voucherNumber,
            companyId,
            circularId,
          },
          tx,
        );
      }

      // Update the SalesReturn
      const updatedSalesReturn = await tx.salesReturn.update({
        where: { id },
        data: {
          voucherGroup: voucherGroup,
          voucherTypeHigh: voucherTypeHigh,
          voucherTypeMedium: voucherTypeMedium,
          isAlsoInventoryReceipt: isAlsoInventoryReceipt,
          invoiceLookupCode: invoiceLookupCode,
          invoiceLookupPath: invoiceLookupPath,
          description: description,
          withOriginalVoucher: withOriginalVoucher,
          deliveryName: deliveryName,
          recieptName: recieptName,
          invoiceNo: invoiceNo,
          invoiceSymbol: invoiceSymbol,
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
          ...(departmentId !== undefined && {
            Department: departmentId
              ? { connect: { id: departmentId } }
              : { disconnect: true },
          }),
        },
        include: {
          Customer: true,
          Employee: true,
          Department: true,
          voucher: true,
          OtherItem_SalesReturn: true,
          SalesReturnCost_SalesReturn: true,
        },
      });

      return updatedSalesReturn;
    });

    return plainToInstance(ResponseSalesReturnDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.salesReturn.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa hàng bị trả lại thành công' };
  }
}
