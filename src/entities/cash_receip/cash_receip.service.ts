import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCashReceipDto } from './dto/create-cash_receip.dto';
import { UpdateCashReceipDto } from './dto/update-cash_receip.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseCashReceipDto } from './dto/response-cash_receip.dto';
import { VoucherService } from '../voucher/voucher.service';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class CashReceipService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
    private readonly fileService: FileService,
  ) {}

  async create(createCashReceipDto: CreateCashReceipDto) {
    const {
      cashReceiptVoucherType,
      payer,
      postedDate,
      voucherDate,
      voucherNumber,
      reason,
      withOriginalVoucher,
      employee,
      subject,
      customer,
      companyId,
      circularId,
      fileBase64, // Lấy trường fileBase64 từ DTO
      originalFileName, // Lấy trường originalFileName từ DTO
    } = createCashReceipDto;

    let uploadedFileId: string | undefined;

    const result = await this.prismaService.$transaction(async (tx) => {
      // --- Xử lý upload file Base64 nếu có ---
      if (fileBase64) {
        // Kiểm tra nếu có dữ liệu Base64
        try {
          const uploadedFileInfo = await this.fileService.uploadBase64File(
            // Gọi hàm upload Base64
            fileBase64,
            originalFileName || 'uploaded_file', // Sử dụng tên gốc hoặc tên mặc định
            companyId, // Liên kết file với companyId
          );
          uploadedFileId = uploadedFileInfo.id; // Lấy ID của bản ghi file đã tạo
        } catch (error) {
          console.error(
            'Failed to upload Base64 file during cash receipt creation:',
            error,
          );
          // Re-throw lỗi để đảm bảo transaction được rollback nếu upload file thất bại
          throw error;
        }
      }

      // Chuẩn bị dữ liệu cho việc tạo Voucher
      const createVoucherDto: CreateVoucherDto = {
        voucherType: 'CASH_RECEIPT', // Loại chứng từ phù hợp
        postedDate,
        voucherDate,
        voucherNumber,
        companyId,
        circularId,
        fileId: uploadedFileId, // Liên kết file đã upload với voucher
      };

      // Tạo bản ghi Voucher trong transaction
      const newVoucher = await this.voucherService.createWithTransaction(
        createVoucherDto,
        tx,
      );

      // Tạo bản ghi CashReceip
      const createdCashReceip = await tx.cashReceip.create({
        data: {
          cashReceiptVoucherType,
          payer,
          reason,
          withOriginalVoucher,
          Employee: employee ? { connect: { id: employee } } : undefined,
          Subject: subject ? { connect: { id: subject } } : undefined,
          Customer: customer ? { connect: { id: customer } } : undefined,
          company: { connect: { id: companyId } }, // Sử dụng companyId từ DTO
          voucher: { connect: { id: newVoucher.id } }, // Kết nối với voucher vừa tạo
        },
        include: {
          // Bao gồm dữ liệu liên quan cho phản hồi nếu cần
          voucher: {
            include: {
              File: true, // Bao gồm File nếu bạn muốn chi tiết của nó trong phản hồi
            },
          },
          Employee: true,
          Subject: true,
          Customer: true,
          // company: true, // Nếu bạn có quan hệ 'company' trong include
        },
      });

      return createdCashReceip;
    });

    // Chuyển đổi kết quả thành DTO phản hồi (giả sử ResponseCashReceipDto tồn tại)
    return plainToInstance(ResponseCashReceipDto, result, {
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
        Employee: true,
        Subject: true,
        Customer: true,
        CashReceipVoucherItem: true,
        voucher: true,
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
        Employee: true,
        Subject: true,
        Customer: true,
        voucher: true,
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
    // Kiểm tra tồn tại
    const existing = await this.prismaService.cashReceip.findUnique({
      where: { id },
      include: { voucher: true },
    });

    if (!existing || existing.deletedAt) {
      throw new NotFoundException('Cash receipt voucher not found');
    }

    const {
      voucherDate,
      postedDate,
      voucherNumber,
      cashReceiptVoucherType,
      payer,
      reason,
      withOriginalVoucher,
      employee,
      subject,
      customer,
      circularId,
    } = updateCashReceipDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      // Update voucher trước
      await this.voucherService.updateWithTransaction(
        existing.voucher.id,
        {
          voucherDate,
          postedDate,
          voucherNumber,
          circularId,
        },
        tx,
      );

      // Update cash receip
      const updatedCashReceip = await tx.cashReceip.update({
        where: { id },
        data: {
          cashReceiptVoucherType,
          payer,
          reason,
          withOriginalVoucher,
          Employee: employee ? { connect: { id: employee } } : undefined,
          Subject: subject ? { connect: { id: subject } } : undefined,
          Customer: customer ? { connect: { id: customer } } : undefined,
        },
        include: {
          Employee: true,
          Subject: true,
          Customer: true,
          voucher: true,
        },
      });

      return updatedCashReceip;
    });

    return plainToInstance(ResponseCashReceipDto, result, {
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
