import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CreateAssetAccessoryDto } from './dto/create-asset_accessory.dto';
import { ResponseAssetAccessoryDto } from './dto/response-asset_accessory.dto';
import { UpdateAssetAccessoryDto } from './dto/update-asset_accessory.dto';

@Injectable()
export class AssetAccessoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAssetAccessoryDto: CreateAssetAccessoryDto) {
    const assetAccessory = await this.prismaService.assetAccessory.create({
      data: createAssetAccessoryDto,
      include: {
        AssetIncrement: true,
        Company: true,
      },
    });

    return plainToInstance(ResponseAssetAccessoryDto, assetAccessory, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const assetAccessories = await this.prismaService.assetAccessory.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        AssetIncrement: true,
        Company: true,
      },
    });

    return plainToInstance(ResponseAssetAccessoryDto, assetAccessories, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const assetAccessory = await this.prismaService.assetAccessory.findUnique({
      where: { id },
      include: {
        AssetIncrement: true,
        Company: true,
      },
    });

    if (!assetAccessory || assetAccessory.deletedAt) {
      throw new NotFoundException('AssetAccessory not found');
    }

    return plainToInstance(ResponseAssetAccessoryDto, assetAccessory, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateAssetAccessoryDto: UpdateAssetAccessoryDto) {
    await this.findOne(id);

    const updatedAssetAccessory =
      await this.prismaService.assetAccessory.update({
        where: { id },
        data: updateAssetAccessoryDto,
        include: {
          AssetIncrement: true,
          Company: true,
        },
      });

    return plainToInstance(ResponseAssetAccessoryDto, updatedAssetAccessory, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.assetAccessory.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa dụng cụ phụ tùng kèm theo thành công' };
  }
}
