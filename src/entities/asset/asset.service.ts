import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetDto } from './dto/response-asset.dto';

@Injectable()
export class AssetService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAssetDto: CreateAssetDto) {
    // Create a new asset
    const asset = await this.prismaService.asset.create({
      data: createAssetDto,
      include: {
        assetType: true,
        Department: true,
        Company: true,
      },
    });

    return plainToInstance(ResponseAssetDto, asset, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const assets = await this.prismaService.asset.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        assetType: true,
        Department: true,
        Company: true,
      },
    });

    return plainToInstance(ResponseAssetDto, assets, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const asset = await this.prismaService.asset.findUnique({
      where: { id },
      include: {
        assetType: true,
        Department: true,
        Company: true,
      },
    });

    if (!asset || asset.deletedAt) {
      throw new NotFoundException('Asset not found');
    }

    return plainToInstance(ResponseAssetDto, asset, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateAssetDto: UpdateAssetDto) {
    // Check if the asset exists
    await this.findOne(id);

    // Update the asset
    const updatedAsset = await this.prismaService.asset.update({
      where: { id },
      data: updateAssetDto,
      include: {
        assetType: true,
        Department: true,
        Company: true,
      },
    });

    return plainToInstance(ResponseAssetDto, updatedAsset, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the asset exists
    await this.findOne(id);

    // Soft delete the asset
    await this.prismaService.asset.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa tài sản thành công' };
  }
}
