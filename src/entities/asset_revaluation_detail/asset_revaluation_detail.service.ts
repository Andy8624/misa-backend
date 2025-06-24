import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetRevaluationDetailDto } from './dto/create-asset_revaluation_detail.dto';
import { UpdateAssetRevaluationDetailDto } from './dto/update-asset_revaluation_detail.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetRevaluationDetailDto } from './dto/response-asset_revaluation_detail.dto';

@Injectable()
export class AssetRevaluationDetailService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createAssetRevaluationDetailDto: CreateAssetRevaluationDetailDto,
  ) {
    const assetRevaluationDetail =
      await this.prismaService.assetRevaluationDetail.create({
        data: createAssetRevaluationDetailDto,
        include: {
          Asset: true,
          Department: true,
          AssetRevaluation: true,
          DepreciationAccount: true,
          DepreciationBaseAccount: true,
          Company: true,
        },
      });

    return plainToInstance(
      ResponseAssetRevaluationDetailDto,
      assetRevaluationDetail,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findAll() {
    const assetRevaluationDetails =
      await this.prismaService.assetRevaluationDetail.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          Asset: true,
          Department: true,
          AssetRevaluation: true,
          DepreciationAccount: true,
          DepreciationBaseAccount: true,
          Company: true,
        },
      });

    return plainToInstance(
      ResponseAssetRevaluationDetailDto,
      assetRevaluationDetails,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findOne(id: string) {
    const assetRevaluationDetail =
      await this.prismaService.assetRevaluationDetail.findUnique({
        where: { id },
        include: {
          Asset: true,
          Department: true,
          AssetRevaluation: true,
          DepreciationAccount: true,
          DepreciationBaseAccount: true,
          Company: true,
        },
      });

    if (!assetRevaluationDetail || assetRevaluationDetail.deletedAt) {
      throw new NotFoundException('AssetRevaluationDetail not found');
    }

    return plainToInstance(
      ResponseAssetRevaluationDetailDto,
      assetRevaluationDetail,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async update(
    id: string,
    updateAssetRevaluationDetailDto: UpdateAssetRevaluationDetailDto,
  ) {
    await this.findOne(id);

    const updatedAssetRevaluationDetail =
      await this.prismaService.assetRevaluationDetail.update({
        where: { id },
        data: updateAssetRevaluationDetailDto,
        include: {
          Asset: true,
          Department: true,
          AssetRevaluation: true,
          DepreciationAccount: true,
          DepreciationBaseAccount: true,
          Company: true,
        },
      });

    return plainToInstance(
      ResponseAssetRevaluationDetailDto,
      updatedAssetRevaluationDetail,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.assetRevaluationDetail.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      message: 'Xóa chi tiết điều chỉnh đánh giá lại tài sản thành công',
    };
  }
}
