import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetTransferDto } from './dto/create-asset_transfer.dto';
import { UpdateAssetTransferDto } from './dto/update-asset_transfer.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetTransferDto } from './dto/response-asset_transfer.dto';
import { VoucherService } from '../voucher/voucher.service';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class AssetTransferService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
    private readonly fileService: FileService,
  ) {}

  async create(createAssetTransferDto: CreateAssetTransferDto) {
    const {
      postedDate,
      voucherDate,
      voucherNumber,
      reason,
      deliveredById,
      receivedById,
      companyId,
      circularId,
      fileBase64, // Thêm trường fileBase64 từ DTO
      originalFileName, // Thêm trường originalFileName từ DTO
      // preUploadedFileId, // Nếu bạn muốn hỗ trợ file đã upload sẵn qua endpoint khác
    } = createAssetTransferDto;

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
            'Failed to upload Base64 file during asset transfer creation:',
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
        voucherType: 'ASSET_TRANSFER',
        postedDate,
        voucherDate,
        voucherNumber,
        companyId,
        circularId,
        fileId: uploadedFileId, // Liên kết file đã upload với voucher
      };

      // Tạo voucher
      const newVoucher = await this.voucherService.createWithTransaction(
        createVoucherDto,
        tx,
      );

      // Tạo asset transfer và gắn voucher
      const createdAssetTransfer = await tx.assetTransfer.create({
        data: {
          reason,
          DeliveredBy: deliveredById
            ? { connect: { id: deliveredById } }
            : undefined,
          ReceivedBy: receivedById
            ? { connect: { id: receivedById } }
            : undefined,
          Company: companyId ? { connect: { id: companyId } } : undefined,
          voucher: { connect: { id: newVoucher.id } }, // Liên kết AssetTransfer với Voucher
        },
        include: {
          voucher: {
            include: {
              File: true,
            },
          },
          DeliveredBy: true,
          ReceivedBy: true,
          Company: true,
          AssetTransferDetail_AssetTransfer: true, // Giữ nguyên include này
        },
      });

      return createdAssetTransfer;
    });

    return plainToInstance(ResponseAssetTransferDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const assetTransfers = await this.prismaService.assetTransfer.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        DeliveredBy: true,
        ReceivedBy: true,
        Company: true,
        AssetTransferDetail_AssetTransfer: true,
        voucher: {
          include: {
            File: true,
          },
        },
      },
    });

    return plainToInstance(ResponseAssetTransferDto, assetTransfers, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const assetTransfer = await this.prismaService.assetTransfer.findUnique({
      where: { id },
      include: {
        DeliveredBy: true,
        ReceivedBy: true,
        Company: true,
        AssetTransferDetail_AssetTransfer: true,
        voucher: {
          include: {
            File: true,
          },
        },
      },
    });

    if (!assetTransfer || assetTransfer.deletedAt) {
      throw new NotFoundException('AssetTransfer not found');
    }

    return plainToInstance(ResponseAssetTransferDto, assetTransfer, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateAssetTransferDto: UpdateAssetTransferDto) {
    // Kiểm tra tồn tại
    const existing = await this.prismaService.assetTransfer.findUnique({
      where: { id },
      include: {
        voucher: {
          include: {
            File: true,
          },
        },
      },
    });

    if (!existing || existing.deletedAt) {
      throw new NotFoundException('Asset transfer voucher not found');
    }

    const {
      voucherDate,
      postedDate,
      voucherNumber,
      reason,
      deliveredById,
      receivedById,
      circularId,
    } = updateAssetTransferDto;

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

      // Update asset transfer
      const updatedAssetTransfer = await tx.assetTransfer.update({
        where: { id },
        data: {
          reason,
          DeliveredBy: deliveredById
            ? { connect: { id: deliveredById } }
            : undefined,
          ReceivedBy: receivedById
            ? { connect: { id: receivedById } }
            : undefined,
        },
        include: {
          DeliveredBy: true,
          ReceivedBy: true,
          Company: true,
          AssetTransferDetail_AssetTransfer: true,
          voucher: {
            include: {
              File: true,
            },
          },
        },
      });

      return updatedAssetTransfer;
    });

    return plainToInstance(ResponseAssetTransferDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.assetTransfer.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa điều chuyển tài sản thành công' };
  }
}
