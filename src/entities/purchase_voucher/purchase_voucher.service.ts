import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseVoucherDto } from './dto/create-purchase_voucher.dto';
import { UpdatePurchaseVoucherDto } from './dto/update-purchase_voucher.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponsePurchaseVoucherDto } from './dto/response-purchase_voucher.dto';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { VoucherService } from '../voucher/voucher.service';
import { FileService } from '../file/file.service';

@Injectable()
export class PurchaseVoucherService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
    private readonly fileService: FileService,
  ) {}

  async create(createDto: CreatePurchaseVoucherDto) {
    const {
      posted_date,
      voucher_date,
      voucher_number,
      companyId,
      payment_t_and_c,
      supplier,
      purchasing_staff,
      recipient_account,
      payment_account,
      circularId,
      fileBase64, // Thêm trường fileBase64 từ DTO
      originalFileName, // Thêm trường originalFileName từ DTO
      // preUploadedFileId, // Nếu bạn muốn hỗ trợ file đã upload sẵn qua endpoint khác
      ...rest // Giữ lại các trường còn lại không cần kết nối quan hệ
    } = createDto;

    let uploadedFileId: string | undefined; // Biến để lưu ID của file đã upload

    const result = await this.prismaService.$transaction(async (tx) => {
      // --- Xử lý upload file Base64 nếu có ---
      // Nếu fileBase64 tồn tại, gọi dịch vụ upload file
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
            'Failed to upload Base64 file during purchase voucher creation:',
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
        voucherType: 'PURCHASE',
        voucherDate: voucher_date,
        postedDate: posted_date,
        voucherNumber: voucher_number,
        companyId,
        circularId,
        fileId: uploadedFileId, // Liên kết file đã upload với voucher
      };

      const newVoucher = await this.voucherService.createWithTransaction(
        createVoucherDto,
        tx,
      );

      const created = await tx.purchaseVoucher.create({
        data: {
          ...rest, // Bao gồm các trường còn lại không được destructure riêng
          PaymentTAndC: payment_t_and_c
            ? { connect: { id: payment_t_and_c } }
            : undefined,
          Supplier: supplier ? { connect: { id: supplier } } : undefined,
          PurchasingStaff: purchasing_staff
            ? { connect: { id: purchasing_staff } }
            : undefined,
          RecipientAccount: recipient_account
            ? { connect: { id: recipient_account } }
            : undefined,
          PaymentAccount: payment_account
            ? { connect: { id: payment_account } }
            : undefined,
          Company: { connect: { id: companyId } },
          voucher: { connect: { id: newVoucher.id } }, // Liên kết PurchaseVoucher với Voucher
        },
        include: {
          PaymentTAndC: true,
          Supplier: true,
          PurchasingStaff: true,
          RecipientAccount: true,
          PaymentAccount: true,
          Company: true,
          voucher: true,
          PurchaseVoucherItem_PurchaseVoucher: true, // Giữ nguyên include này
        },
      });

      return created;
    });

    return plainToInstance(ResponsePurchaseVoucherDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const purchaseVouchers = await this.prismaService.purchaseVoucher.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        PaymentTAndC: true,
        Supplier: true,
        PurchasingStaff: true,
        RecipientAccount: true,
        PaymentAccount: true,
        Company: true,
        voucher: true,
        PurchaseVoucherItem_PurchaseVoucher: true,
      },
    });

    return plainToInstance(ResponsePurchaseVoucherDto, purchaseVouchers, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const purchaseVoucher = await this.prismaService.purchaseVoucher.findUnique(
      {
        where: { id },
        include: {
          PaymentTAndC: true,
          Supplier: true,
          PurchasingStaff: true,
          RecipientAccount: true,
          PaymentAccount: true,
          Company: true,
          voucher: true,
          PurchaseVoucherItem_PurchaseVoucher: true,
        },
      },
    );

    if (!purchaseVoucher || purchaseVoucher.deletedAt) {
      throw new NotFoundException('Purchase voucher not found');
    }

    return plainToInstance(ResponsePurchaseVoucherDto, purchaseVoucher, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updatePurchaseVoucherDto: UpdatePurchaseVoucherDto) {
    const {
      posted_date,
      voucher_date,
      voucher_number,
      companyId,
      payment_t_and_c,
      supplier,
      purchasing_staff,
      recipient_account,
      payment_account,
      circularId,
      ...rest
    } = updatePurchaseVoucherDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      const existing = await tx.purchaseVoucher.findUnique({
        where: { id },
        include: { voucher: true },
      });

      if (!existing || existing.deletedAt) {
        throw new NotFoundException('Purchase voucher not found');
      }

      await this.voucherService.updateWithTransaction(
        existing.voucher?.id,
        {
          postedDate: posted_date,
          voucherDate: voucher_date,
          voucherNumber: voucher_number,
          circularId,
        },
        tx,
      );

      const updated = await tx.purchaseVoucher.update({
        where: { id },
        data: {
          ...rest,
          PaymentTAndC: payment_t_and_c
            ? { connect: { id: payment_t_and_c } }
            : undefined,
          Supplier: supplier ? { connect: { id: supplier } } : undefined,
          PurchasingStaff: purchasing_staff
            ? { connect: { id: purchasing_staff } }
            : undefined,
          RecipientAccount: recipient_account
            ? { connect: { id: recipient_account } }
            : undefined,
          PaymentAccount: payment_account
            ? { connect: { id: payment_account } }
            : undefined,
          Company: { connect: { id: companyId } },
        },
        include: {
          PaymentTAndC: true,
          Supplier: true,
          PurchasingStaff: true,
          RecipientAccount: true,
          PaymentAccount: true,
          Company: true,
          voucher: true,
          PurchaseVoucherItem_PurchaseVoucher: true,
        },
      });

      return updated;
    });

    return plainToInstance(ResponsePurchaseVoucherDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the purchase voucher exists
    await this.findOne(id);

    // Soft delete the purchase voucher
    await this.prismaService.purchaseVoucher.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa chứng từ mua hàng thành công' };
  }
}
