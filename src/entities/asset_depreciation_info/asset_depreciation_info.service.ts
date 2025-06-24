import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetDepreciationInfoDto } from './dto/create-asset_depreciation_info.dto';
import { UpdateAssetDepreciationInfoDto } from './dto/update-asset_depreciation_info.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetDepreciationInfoDto } from './dto/response-asset_depreciation_info.dto';

@Injectable()
export class AssetDepreciationInfoService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAssetDepreciationInfoDto: CreateAssetDepreciationInfoDto) {
    const assetDepreciationInfo =
      await this.prismaService.assetDepreciationInfo.create({
        data: createAssetDepreciationInfoDto,
        include: {
          AssetIncrement: true,
          OriginalCostAccount: true,
          DepreciationAccount: true,
          Company: true,
        },
      });

    return plainToInstance(
      ResponseAssetDepreciationInfoDto,
      assetDepreciationInfo,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findAll() {
    const assetDepreciationInfos =
      await this.prismaService.assetDepreciationInfo.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          AssetIncrement: true,
          OriginalCostAccount: true,
          DepreciationAccount: true,
          Company: true,
        },
      });

    return plainToInstance(
      ResponseAssetDepreciationInfoDto,
      assetDepreciationInfos,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findOne(id: string) {
    const assetDepreciationInfo =
      await this.prismaService.assetDepreciationInfo.findUnique({
        where: { id },
        include: {
          AssetIncrement: true,
          OriginalCostAccount: true,
          DepreciationAccount: true,
          Company: true,
        },
      });

    if (!assetDepreciationInfo || assetDepreciationInfo.deletedAt) {
      throw new NotFoundException('AssetDepreciationInfo not found');
    }

    return plainToInstance(
      ResponseAssetDepreciationInfoDto,
      assetDepreciationInfo,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async update(
    id: string,
    updateAssetDepreciationInfoDto: UpdateAssetDepreciationInfoDto,
  ) {
    await this.findOne(id);

    const updatedAssetDepreciationInfo =
      await this.prismaService.assetDepreciationInfo.update({
        where: { id },
        data: updateAssetDepreciationInfoDto,
        include: {
          AssetIncrement: true,
          OriginalCostAccount: true,
          DepreciationAccount: true,
          Company: true,
        },
      });

    return plainToInstance(
      ResponseAssetDepreciationInfoDto,
      updatedAssetDepreciationInfo,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.assetDepreciationInfo.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa thông tin khấu hao tài sản thành công' };
  }
}
