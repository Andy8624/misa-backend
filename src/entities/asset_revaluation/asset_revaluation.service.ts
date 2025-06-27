import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetRevaluationDto } from './dto/create-asset_revaluation.dto';
import { UpdateAssetRevaluationDto } from './dto/update-asset_revaluation.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetRevaluationDto } from './dto/response-asset_revaluation.dto';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { VoucherService } from '../voucher/voucher.service';

@Injectable()
export class AssetRevaluationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
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
    } = createAssetRevaluationDto;

    const createVoucherDto: CreateVoucherDto = {
      voucherType: 'ASSET_REVALUATION', // giả sử loại voucher này
      voucherNumber,
      voucherDate,
      postedDate,
      companyId,
      circularId,
    };

    const result = await this.prismaService.$transaction(async (tx) => {
      // Tạo voucher
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
          voucher: { connect: { id: newVoucher.id } },
        },
        include: {
          Company: true,
          details: true,
          postings: true,
          voucher: true,
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
