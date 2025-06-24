import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetWriteOffAssetDto } from './dto/create-asset_write_off_asset.dto';
import { UpdateAssetWriteOffAssetDto } from './dto/update-asset_write_off_asset.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetWriteOffAssetDto } from './dto/response-asset_write_off_asset.dto';

@Injectable()
export class AssetWriteOffAssetService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAssetWriteOffAssetDto: CreateAssetWriteOffAssetDto) {
    const assetWriteOffAsset =
      await this.prismaService.assetWriteOffAsset.create({
        data: createAssetWriteOffAssetDto,
        include: {
          AssetWriteOff: true,
          Department: true,
          AccountOriginalCost: true,
          AccountDepreciation: true,
          AccountRemainingValue: true,
          Company: true,
        },
      });

    return plainToInstance(ResponseAssetWriteOffAssetDto, assetWriteOffAsset, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const assetWriteOffAssets =
      await this.prismaService.assetWriteOffAsset.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          AssetWriteOff: true,
          Department: true,
          AccountOriginalCost: true,
          AccountDepreciation: true,
          AccountRemainingValue: true,
          Company: true,
        },
      });

    return plainToInstance(ResponseAssetWriteOffAssetDto, assetWriteOffAssets, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const assetWriteOffAsset =
      await this.prismaService.assetWriteOffAsset.findUnique({
        where: { id },
        include: {
          AssetWriteOff: true,
          Department: true,
          AccountOriginalCost: true,
          AccountDepreciation: true,
          AccountRemainingValue: true,
          Company: true,
        },
      });

    if (!assetWriteOffAsset || assetWriteOffAsset.deletedAt) {
      throw new NotFoundException('AssetWriteOffAsset not found');
    }

    return plainToInstance(ResponseAssetWriteOffAssetDto, assetWriteOffAsset, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: string,
    updateAssetWriteOffAssetDto: UpdateAssetWriteOffAssetDto,
  ) {
    await this.findOne(id);

    const updatedAssetWriteOffAsset =
      await this.prismaService.assetWriteOffAsset.update({
        where: { id },
        data: updateAssetWriteOffAssetDto,
        include: {
          AssetWriteOff: true,
          Department: true,
          AccountOriginalCost: true,
          AccountDepreciation: true,
          AccountRemainingValue: true,
          Company: true,
        },
      });

    return plainToInstance(
      ResponseAssetWriteOffAssetDto,
      updatedAssetWriteOffAsset,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.assetWriteOffAsset.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa tài sản ghi giảm thành công' };
  }
}
