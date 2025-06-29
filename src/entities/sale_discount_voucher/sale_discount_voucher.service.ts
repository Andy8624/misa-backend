import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDiscountVoucherDto } from './dto/create-sale_discount_voucher.dto';
import { UpdateSaleDiscountVoucherDto } from './dto/update-sale_discount_voucher.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseSaleDiscountVoucherDto } from './dto/response-sale_discount_voucher.dto';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { VoucherService } from '../voucher/voucher.service';
import { FileService } from '../file/file.service';

@Injectable()
export class SaleDiscountVoucherService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
    private readonly fileService: FileService,
  ) {}

  async create(createSaleDiscountVoucherDto: CreateSaleDiscountVoucherDto) {
    const {
      voucherType,
      typeInside,
      customerId,
      employeeId,
      departmentId,
      description,
      invoiceLookupCode,
      invoiceLookupPath,
      invoiceNo,
      invoiceSymbol,
      taxCode,
      paymentType,
      bankAccountId,
      // Các thuộc tính dùng để tạo voucher
      companyId,
      postedDate,
      voucherDate,
      voucherNumber,
      circularId,
      fileBase64, // Thêm trường fileBase64 từ DTO
      originalFileName, // Thêm trường originalFileName từ DTO
      // preUploadedFileId, // Nếu bạn muốn hỗ trợ file đã upload sẵn qua endpoint khác
    } = createSaleDiscountVoucherDto;

    let uploadedFileId: string | undefined; // Biến để lưu ID của file đã upload

    const result = await this.prismaService.$transaction(async (tx) => {
      // --- Xử lý upload file Base64 nếu có ---
      if (fileBase64) {
        try {
          const uploadedFileInfo = await this.fileService.uploadBase64File(
            fileBase64,
            originalFileName || 'uploaded_file', // Sử dụng tên gốc hoặc tên mặc định
            companyId, // Liên kết file với companyId (nếu file model của bạn có companyId)
          );
          uploadedFileId = uploadedFileInfo.id; // Lấy ID của bản ghi file đã tạo
        } catch (error) {
          console.error(
            'Failed to upload Base64 file during sale discount voucher creation:',
            error,
          );
          // Re-throw lỗi để đảm bảo transaction được rollback nếu upload file thất bại
          throw error;
        }
      }
      // --- Hoặc nếu bạn muốn hỗ trợ preUploadedFileId, bạn có thể thêm logic này:
      // else if (preUploadedFileId) {
      //   uploadedFileId = preUploadedFileId;
      // }

      const createVoucherDto: CreateVoucherDto = {
        voucherType: 'SALE_DISCOUNT', // Loại chứng từ là 'SALE_DISCOUNT'
        voucherDate: voucherDate,
        postedDate: postedDate,
        voucherNumber: voucherNumber,
        companyId: companyId,
        circularId: circularId,
        fileId: uploadedFileId, // Liên kết file đã upload với voucher
      };

      // Tạo voucher
      const newVoucher = await this.voucherService.createWithTransaction(
        createVoucherDto,
        tx,
      );

      // Tạo SaleDiscountVoucher và gắn voucher
      const createdSaleDiscountVoucher = await tx.saleDiscountVoucher.create({
        data: {
          voucherType: voucherType,
          typeInside: typeInside,
          description: description,
          invoiceLookupCode: invoiceLookupCode,
          invoiceLookupPath: invoiceLookupPath,
          invoiceNo: invoiceNo,
          invoiceSymbol: invoiceSymbol,
          taxCode: taxCode,
          paymentType: paymentType,
          voucher: { connect: { id: newVoucher.id } }, // Gắn voucher đã tạo
          ...(customerId && { Customer: { connect: { id: customerId } } }),
          ...(employeeId && { Employee: { connect: { id: employeeId } } }),
          ...(departmentId && {
            Department: { connect: { id: departmentId } },
          }),
          ...(bankAccountId && {
            BankAccount: { connect: { id: bankAccountId } },
          }),
        },
        include: {
          Customer: true,
          Employee: true,
          Department: true,
          BankAccount: true,
          voucher: {
            include: {
              File: true, // Đảm bảo rằng bạn bao gồm thông tin File nếu có
            },
          },
          OrderItem_SaleDiscountVoucher: true,
        },
      });

      return createdSaleDiscountVoucher;
    });

    return plainToInstance(ResponseSaleDiscountVoucherDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const saleDiscountVouchers =
      await this.prismaService.saleDiscountVoucher.findMany({
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
          BankAccount: true,
        },
      });

    return plainToInstance(
      ResponseSaleDiscountVoucherDto,
      saleDiscountVouchers,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findOne(id: string) {
    const saleDiscountVoucher =
      await this.prismaService.saleDiscountVoucher.findUnique({
        where: { id },
        include: {
          Customer: true,
          Employee: true,
          Department: true,
          voucher: true,
          BankAccount: true,
        },
      });

    if (!saleDiscountVoucher || saleDiscountVoucher.deletedAt) {
      throw new NotFoundException('SaleDiscountVoucher not found');
    }

    return plainToInstance(
      ResponseSaleDiscountVoucherDto,
      saleDiscountVoucher,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async update(
    id: string,
    updateSaleDiscountVoucherDto: UpdateSaleDiscountVoucherDto,
  ) {
    // Kiểm tra tồn tại
    const existingSaleDiscountVoucher =
      await this.prismaService.saleDiscountVoucher.findUnique({
        where: { id },
        include: { voucher: true },
      });

    if (!existingSaleDiscountVoucher || existingSaleDiscountVoucher.deletedAt) {
      throw new NotFoundException(
        'Sale discount voucher not found or already deleted',
      );
    }

    const {
      voucherType,
      typeInside,
      customerId,
      employeeId,
      departmentId,
      description,
      invoiceLookupCode,
      invoiceLookupPath,
      invoiceNo,
      invoiceSymbol,
      taxCode,
      paymentType,
      bankAccountId,
      // Các thuộc tính dùng để cập nhật voucher
      companyId,
      postedDate,
      voucherDate,
      voucherNumber,
      circularId,
    } = updateSaleDiscountVoucherDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      // Cập nhật voucher trước
      if (existingSaleDiscountVoucher.voucher) {
        await this.voucherService.updateWithTransaction(
          existingSaleDiscountVoucher.voucher.id,
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

      // Cập nhật SaleDiscountVoucher
      const updatedSaleDiscountVoucher = await tx.saleDiscountVoucher.update({
        where: { id },
        data: {
          voucherType: voucherType,
          typeInside: typeInside,
          description: description,
          invoiceLookupCode: invoiceLookupCode,
          invoiceLookupPath: invoiceLookupPath,
          invoiceNo: invoiceNo,
          invoiceSymbol: invoiceSymbol,
          taxCode: taxCode,
          paymentType: paymentType,
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
          ...(bankAccountId !== undefined && {
            BankAccount: bankAccountId
              ? { connect: { id: bankAccountId } }
              : { disconnect: true },
          }),
        },
        include: {
          Customer: true,
          Employee: true,
          Department: true,
          BankAccount: true,
          voucher: true,
          OrderItem_SaleDiscountVoucher: true,
        },
      });

      return updatedSaleDiscountVoucher;
    });

    return plainToInstance(ResponseSaleDiscountVoucherDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.saleDiscountVoucher.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa phiếu giảm giá bán thành công' };
  }
}
