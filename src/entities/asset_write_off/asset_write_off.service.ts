import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetWriteOffDto } from './dto/create-asset_write_off.dto';
import { UpdateAssetWriteOffDto } from './dto/update-asset_write_off.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetWriteOffDto } from './dto/response-asset_write_off.dto';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { VoucherService } from '../voucher/voucher.service';
import { FileService } from '../file/file.service';

@Injectable()
export class AssetWriteOffService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
    private readonly fileService: FileService,
  ) {}

  async create(createAssetWriteOffDto: CreateAssetWriteOffDto) {
    const {
      reason,
      postedDate,
      voucherDate,
      voucherNumber,
      companyId,
      circularId,
      fileBase64, // Thêm trường fileBase64 từ DTO
      originalFileName, // Thêm trường originalFileName từ DTO
      // preUploadedFileId, // Nếu bạn muốn hỗ trợ file đã upload sẵn qua endpoint khác
    } = createAssetWriteOffDto;

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
            'Failed to upload Base64 file during asset write-off creation:',
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
        voucherType: 'ASSET_WRITE_OFF',
        postedDate,
        voucherDate,
        voucherNumber,
        companyId,
        circularId,
        fileId: uploadedFileId, // Liên kết file đã upload với voucher
      };

      // Tạo voucher trước
      const newVoucher = await this.voucherService.createWithTransaction(
        createVoucherDto,
        tx,
      );

      // Tạo asset write-off và gắn voucher
      const createdAssetWriteOff = await tx.assetWriteOff.create({
        data: {
          reason,
          Company: companyId ? { connect: { id: companyId } } : undefined,
          voucher: { connect: { id: newVoucher.id } }, // Liên kết AssetWriteOff với Voucher
        },
        include: {
          Company: true,
          assets: true,
          accountings: true,
          voucher: {
            include: {
              File: true, // Đảm bảo rằng bạn bao gồm thông tin File nếu có
            },
          },
        },
      });

      return createdAssetWriteOff;
    });

    return plainToInstance(ResponseAssetWriteOffDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const assetWriteOffs = await this.prismaService.assetWriteOff.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Company: true,
        assets: true,
        accountings: true,
        voucher: {
          include: {
            File: true,
          },
        },
      },
    });

    return plainToInstance(ResponseAssetWriteOffDto, assetWriteOffs, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const assetWriteOff = await this.prismaService.assetWriteOff.findUnique({
      where: { id },
      include: {
        Company: true,
        assets: true,
        accountings: true,
        voucher: {
          include: {
            File: true,
          },
        },
      },
    });

    if (!assetWriteOff || assetWriteOff.deletedAt) {
      throw new NotFoundException('AssetWriteOff not found');
    }

    return plainToInstance(ResponseAssetWriteOffDto, assetWriteOff, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateAssetWriteOffDto: UpdateAssetWriteOffDto) {
    // Kiểm tra tồn tại
    const existing = await this.prismaService.assetWriteOff.findUnique({
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
      throw new NotFoundException('Asset write-off voucher not found');
    }

    const {
      reason,
      postedDate,
      voucherDate,
      voucherNumber,
      circularId,
      companyId,
    } = updateAssetWriteOffDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      // Cập nhật voucher trước
      await this.voucherService.updateWithTransaction(
        existing.voucher.id,
        {
          postedDate,
          voucherDate,
          voucherNumber,
          circularId,
        },
        tx,
      );

      // Cập nhật AssetWriteOff
      const updatedAssetWriteOff = await tx.assetWriteOff.update({
        where: { id },
        data: {
          reason,
          Company: companyId ? { connect: { id: companyId } } : undefined,
        },
        include: {
          Company: true,
          assets: true,
          accountings: true,
          voucher: {
            include: {
              File: true,
            },
          },
        },
      });

      return updatedAssetWriteOff;
    });

    return plainToInstance(ResponseAssetWriteOffDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.assetWriteOff.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa bản ghi ghi giảm tài sản thành công' };
  }
}
