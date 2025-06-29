import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseCashPaymentDto } from './dto/response-cash-payment.dto';
import { CreateCashPaymentDto } from './dto/create-cash-payment.dto';
import { UpdateCashPaymentDto } from './dto/update-cash-payment.dto';
import { VoucherService } from '../voucher/voucher.service';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class CashPaymentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
    private readonly fileService: FileService,
  ) {}

  async create(createCashPaymentDto: CreateCashPaymentDto) {
    const {
      cashPaymentVoucherType,
      recipient,
      supplierName,
      reason,
      withOriginalVoucher,
      postedDate,
      voucherDate,
      voucherNumber,
      employee,
      subject,
      supplier,
      companyId,
      circularId,
      fileBase64, // Lấy trường fileBase64 từ DTO
      originalFileName, // Lấy trường originalFileName từ DTO
    } = createCashPaymentDto;

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
            'Failed to upload Base64 file during cash payment creation:',
            error,
          );
          // Re-throw lỗi để đảm bảo transaction được rollback nếu upload file thất bại
          throw error;
        }
      }

      // Chuẩn bị dữ liệu cho việc tạo Voucher
      const createVoucherDto: CreateVoucherDto = {
        voucherType: 'CASH_PAYMENT', // Loại chứng từ phù hợp
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

      // Tạo bản ghi CashPayment
      const createdCashPayment = await tx.cashPayment.create({
        data: {
          cashPaymentVoucherType,
          recipient,
          supplierName,
          reason,
          withOriginalVoucher,
          // Kết nối các mối quan hệ dựa trên ID được cung cấp
          Employee: employee ? { connect: { id: employee } } : undefined,
          Subject: subject ? { connect: { id: subject } } : undefined,
          Supplier: supplier ? { connect: { id: supplier } } : undefined,
          company: companyId ? { connect: { id: companyId } } : undefined, // Sử dụng companyId từ DTO
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
          Supplier: true,
          company: true, // Bao gồm Company nếu nó là một model
        },
      });

      return createdCashPayment;
    });

    // Chuyển đổi kết quả thành DTO phản hồi (giả sử ResponseCashPaymentDto tồn tại)
    return plainToInstance(ResponseCashPaymentDto, result, {
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
        voucher: {
          include: {
            File: true,
          },
        },
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
        voucher: {
          include: {
            File: true,
          },
        },
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
    // Kiểm tra xem phiếu chi có tồn tại không
    const existing = await this.prismaService.cashPayment.findUnique({
      where: { id },
      include: { voucher: true },
    });

    if (!existing || existing.deletedAt) {
      throw new NotFoundException('Cash payment voucher not found');
    }

    const {
      cashPaymentVoucherType,
      recipient,
      postedDate,
      voucherDate,
      voucherNumber,
      reason,
      withOriginalVoucher,
      employee,
      subject,
      supplier,
      circularId,
    } = updateCashPaymentDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      // Cập nhật phiếu kế toán (voucher)
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

      // Cập nhật phiếu chi
      const updatedCashPayment = await tx.cashPayment.update({
        where: { id },
        data: {
          cashPaymentVoucherType,
          recipient,
          reason,
          withOriginalVoucher,
          Employee: employee ? { connect: { id: employee } } : undefined,
          Subject: subject ? { connect: { id: subject } } : undefined,
          Supplier: supplier ? { connect: { id: supplier } } : undefined,
        },
        include: {
          Employee: true,
          Subject: true,
          Supplier: true,
          CashPaymentVoucherItem: true,
          voucher: {
            include: {
              File: true,
            },
          },
        },
      });

      return updatedCashPayment;
    });

    return plainToInstance(ResponseCashPaymentDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.cashPayment.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa phiếu chi tiền mặt thành công' };
  }
}
