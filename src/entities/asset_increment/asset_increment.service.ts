import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetIncrementDto } from './dto/create-asset_increment.dto';
import { UpdateAssetIncrementDto } from './dto/update-asset_increment.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetIncrementDto } from './dto/response-asset_increment.dto';

@Injectable()
export class AssetIncrementService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAssetIncrementDto: CreateAssetIncrementDto) {
    const assetIncrement = await this.prismaService.assetIncrement.create({
      data: createAssetIncrementDto,
      include: {
        Department: true,
        Company: true,
        AssetDepreciationInfo_AssetIncrement: true, // Thêm include cho bảng con
        AssetAllocation_AssetIncrement: true, // Thêm include cho bảng con
        AssetComponent_AssetIncrement: true, // Thêm include cho bảng con
        AssetAccessory_AssetIncrement: true, // Thêm include cho bảng con
        AssetFormationOrigin_AssetIncrement: true, // Thêm include cho bảng con
      },
    });

    return plainToInstance(ResponseAssetIncrementDto, assetIncrement, {
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
    await this.findOne(id);

    const updatedAssetIncrement =
      await this.prismaService.assetIncrement.update({
        where: { id },
        data: updateAssetIncrementDto,
        include: {
          Department: true,
          Company: true,
          AssetDepreciationInfo_AssetIncrement: true, // Thêm include cho bảng con
          AssetAllocation_AssetIncrement: true, // Thêm include cho bảng con
          AssetComponent_AssetIncrement: true, // Thêm include cho bảng con
          AssetAccessory_AssetIncrement: true, // Thêm include cho bảng con
          AssetFormationOrigin_AssetIncrement: true, // Thêm include cho bảng con
        },
      });

    return plainToInstance(ResponseAssetIncrementDto, updatedAssetIncrement, {
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
