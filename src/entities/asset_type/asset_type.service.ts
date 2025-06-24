import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetTypeDto } from './dto/create-asset_type.dto';
import { UpdateAssetTypeDto } from './dto/update-asset_type.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetTypeDto } from './dto/response-asset_type.dto';

@Injectable()
export class AssetTypeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAssetTypeDto: CreateAssetTypeDto) {
    // Create a new asset type
    const assetType = await this.prismaService.assetType.create({
      data: createAssetTypeDto,
    });

    return plainToInstance(ResponseAssetTypeDto, assetType, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const assetTypes = await this.prismaService.assetType.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return plainToInstance(ResponseAssetTypeDto, assetTypes, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const assetType = await this.prismaService.assetType.findUnique({
      where: { id },
    });

    if (!assetType || assetType.deletedAt) {
      throw new NotFoundException('Asset type not found');
    }

    return plainToInstance(ResponseAssetTypeDto, assetType, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateAssetTypeDto: UpdateAssetTypeDto) {
    // Check if the asset type exists
    await this.findOne(id);

    // Update the asset type
    const updatedAssetType = await this.prismaService.assetType.update({
      where: { id },
      data: updateAssetTypeDto,
    });

    return plainToInstance(ResponseAssetTypeDto, updatedAssetType, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the asset type exists
    await this.findOne(id);

    // Soft delete the asset type
    await this.prismaService.assetType.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa loại tài sản thành công' };
  }
}
