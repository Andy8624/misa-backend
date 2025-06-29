import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetIncrementDto } from './dto/create-asset_increment.dto';
import { UpdateAssetIncrementDto } from './dto/update-asset_increment.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetIncrementDto } from './dto/response-asset_increment.dto';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { VoucherService } from '../voucher/voucher.service';
import { FileService } from '../file/file.service';

@Injectable()
export class AssetIncrementService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
    private readonly fileService: FileService,
  ) {}

  async create(createAssetIncrementDto: CreateAssetIncrementDto) {
    const {
      voucherNumber,
      incrementDate,
      assetType,
      assetCode,
      assetName,
      isDepreciable,
      departmentId,
      companyId,
      circularId,
      fileBase64, // Thêm trường fileBase64 từ DTO
      originalFileName, // Thêm trường originalFileName từ DTO
      // preUploadedFileId, // Nếu bạn muốn hỗ trợ file đã upload sẵn qua endpoint khác
    } = createAssetIncrementDto;

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
            'Failed to upload Base64 file during asset increment creation:',
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
        voucherType: 'ASSET_INCREMENT',
        voucherDate: incrementDate,
        postedDate: incrementDate,
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

      // Tạo AssetIncrement và gắn voucher
      const createdAssetIncrement = await tx.assetIncrement.create({
        data: {
          incrementDate,
          assetType,
          assetCode,
          assetName,
          isDepreciable,
          Department: departmentId
            ? { connect: { id: departmentId } }
            : undefined,
          Company: companyId ? { connect: { id: companyId } } : undefined,
          voucher: { connect: { id: newVoucher.id } }, // Liên kết AssetIncrement với Voucher
        },
        include: {
          Department: true,
          Company: true,
          voucher: {
            include: {
              File: true, // Đảm bảo rằng bạn bao gồm thông tin File nếu có
            },
          },
          AssetDepreciationInfo_AssetIncrement: true,
          AssetAllocation_AssetIncrement: true,
          AssetComponent_AssetIncrement: true,
          AssetAccessory_AssetIncrement: true,
          AssetFormationOrigin_AssetIncrement: true,
        },
      });

      return createdAssetIncrement;
    });

    return plainToInstance(ResponseAssetIncrementDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const assetIncrements = await this.prismaService.assetIncrement.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Department: true,
        Company: true,
        AssetDepreciationInfo_AssetIncrement: true,
        AssetAllocation_AssetIncrement: true,
        AssetComponent_AssetIncrement: true,
        AssetAccessory_AssetIncrement: true,
        AssetFormationOrigin_AssetIncrement: true,
        voucher: true,
      },
    });

    return plainToInstance(ResponseAssetIncrementDto, assetIncrements, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const assetIncrement = await this.prismaService.assetIncrement.findUnique({
      where: { id },
      include: {
        Department: true,
        Company: true,
        AssetDepreciationInfo_AssetIncrement: true,
        AssetAllocation_AssetIncrement: true,
        AssetComponent_AssetIncrement: true,
        AssetAccessory_AssetIncrement: true,
        AssetFormationOrigin_AssetIncrement: true,
        voucher: true,
      },
    });

    if (!assetIncrement || assetIncrement.deletedAt) {
      throw new NotFoundException('AssetIncrement not found');
    }

    return plainToInstance(ResponseAssetIncrementDto, assetIncrement, {
      excludeExtraneousValues: true,
    });
  }
  async update(id: string, updateAssetIncrementDto: UpdateAssetIncrementDto) {
    // Kiểm tra tồn tại
    const existing = await this.prismaService.assetIncrement.findUnique({
      where: { id },
      include: { voucher: true },
    });

    if (!existing || existing.deletedAt) {
      throw new NotFoundException('Asset increment not found');
    }

    const {
      voucherNumber,
      incrementDate,
      assetType,
      assetCode,
      assetName,
      isDepreciable,
      departmentId,
      circularId,
    } = updateAssetIncrementDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      // Cập nhật voucher
      await this.voucherService.updateWithTransaction(
        existing.voucher?.id,
        {
          voucherNumber,
          voucherDate: incrementDate,
          postedDate: incrementDate,
          circularId,
        },
        tx,
      );

      // Cập nhật asset increment
      const updatedAssetIncrement = await tx.assetIncrement.update({
        where: { id },
        data: {
          incrementDate,
          assetType,
          assetCode,
          assetName,
          isDepreciable,
          Department: departmentId
            ? { connect: { id: departmentId } }
            : undefined,
        },
        include: {
          Department: true,
          Company: true,
          voucher: true,
          AssetDepreciationInfo_AssetIncrement: true,
          AssetAllocation_AssetIncrement: true,
          AssetComponent_AssetIncrement: true,
          AssetAccessory_AssetIncrement: true,
          AssetFormationOrigin_AssetIncrement: true,
        },
      });

      return updatedAssetIncrement;
    });

    return plainToInstance(ResponseAssetIncrementDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.assetIncrement.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa ghi tăng tài sản thành công' };
  }
}
