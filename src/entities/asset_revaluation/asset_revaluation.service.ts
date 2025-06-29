import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetRevaluationDto } from './dto/create-asset_revaluation.dto';
import { UpdateAssetRevaluationDto } from './dto/update-asset_revaluation.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetRevaluationDto } from './dto/response-asset_revaluation.dto';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { VoucherService } from '../voucher/voucher.service';
import { FileService } from '../file/file.service';

@Injectable()
export class AssetRevaluationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
    private readonly fileService: FileService,
  ) {}

  async create(createAssetRevaluationDto: CreateAssetRevaluationDto) {
    const {
      revaluationCode,
      revaluationDate,
      reason,
      postedDate,
      voucherDate,
      voucherNumber,
      companyId,
      circularId,
      fileBase64, // Thêm trường fileBase64 từ DTO
      originalFileName, // Thêm trường originalFileName từ DTO
      // preUploadedFileId, // Nếu bạn muốn hỗ trợ file đã upload sẵn qua endpoint khác
    } = createAssetRevaluationDto;

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
            'Failed to upload Base64 file during asset revaluation creation:',
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
        voucherType: 'ASSET_REVALUATION', // Giả sử loại voucher này
        voucherNumber,
        voucherDate,
        postedDate,
        companyId,
        circularId,
        fileId: uploadedFileId, // Liên kết file đã upload với voucher
      };

      // Tạo voucher trước
      const newVoucher = await this.voucherService.createWithTransaction(
        createVoucherDto,
        tx,
      );

      // Tạo assetRevaluation và liên kết voucher
      const createdAssetRevaluation = await tx.assetRevaluation.create({
        data: {
          revaluationCode,
          revaluationDate,
          reason,
          Company: companyId ? { connect: { id: companyId } } : undefined,
          voucher: { connect: { id: newVoucher.id } }, // Liên kết AssetRevaluation với Voucher
        },
        include: {
          Company: true,
          details: true,
          postings: true,
          voucher: {
            include: {
              File: true, // Đảm bảo rằng bạn bao gồm thông tin File nếu có
            },
          },
        },
      });

      return createdAssetRevaluation;
    });

    return plainToInstance(ResponseAssetRevaluationDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const assetRevaluations =
      await this.prismaService.assetRevaluation.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          Company: true,
          details: true,
          postings: true,
          voucher: true,
        },
      });

    return plainToInstance(ResponseAssetRevaluationDto, assetRevaluations, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const assetRevaluation =
      await this.prismaService.assetRevaluation.findUnique({
        where: { id },
        include: {
          Company: true,
          details: true,
          postings: true,
          voucher: true,
        },
      });

    if (!assetRevaluation || assetRevaluation.deletedAt) {
      throw new NotFoundException('AssetRevaluation not found');
    }

    return plainToInstance(ResponseAssetRevaluationDto, assetRevaluation, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: string,
    updateAssetRevaluationDto: UpdateAssetRevaluationDto,
  ) {
    // Kiểm tra bản ghi tồn tại và lấy voucherId
    const existing = await this.prismaService.assetRevaluation.findUnique({
      where: { id },
      include: { voucher: true },
    });

    if (!existing || existing.deletedAt) {
      throw new NotFoundException('Asset revaluation not found');
    }

    const {
      revaluationCode,
      revaluationDate,
      reason,
      postedDate,
      voucherDate,
      voucherNumber,
      companyId,
      circularId,
    } = updateAssetRevaluationDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      // Update voucher trước
      if (existing.voucher) {
        await this.voucherService.updateWithTransaction(
          existing.voucher.id,
          {
            voucherDate,
            postedDate,
            voucherNumber,
            circularId,
            companyId,
          },
          tx,
        );
      }

      // Update assetRevaluation
      const updatedAssetRevaluation = await tx.assetRevaluation.update({
        where: { id },
        data: {
          revaluationCode,
          revaluationDate,
          reason,
          companyId,
        },
        include: {
          Company: true,
          details: true,
          postings: true,
          voucher: true,
        },
      });

      return updatedAssetRevaluation;
    });

    return plainToInstance(ResponseAssetRevaluationDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.assetRevaluation.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa đánh giá lại tài sản thành công' };
  }
}
