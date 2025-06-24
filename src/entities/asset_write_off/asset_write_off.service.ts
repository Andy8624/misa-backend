import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetWriteOffDto } from './dto/create-asset_write_off.dto';
import { UpdateAssetWriteOffDto } from './dto/update-asset_write_off.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetWriteOffDto } from './dto/response-asset_write_off.dto';

@Injectable()
export class AssetWriteOffService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAssetWriteOffDto: CreateAssetWriteOffDto) {
    const assetWriteOff = await this.prismaService.assetWriteOff.create({
      data: createAssetWriteOffDto,
      include: {
        Company: true,
        assets: true, // Bao gồm các bảng con
        accountings: true, // Bao gồm các bảng con
      },
    });

    return plainToInstance(ResponseAssetWriteOffDto, assetWriteOff, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const assetWriteOffs = await this.prismaService.assetWriteOff.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Company: true,
        assets: true,
        accountings: true,
      },
    });

    return plainToInstance(ResponseAssetWriteOffDto, assetWriteOffs, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const assetWriteOff = await this.prismaService.assetWriteOff.findUnique({
      where: { id },
      include: {
        Company: true,
        assets: true,
        accountings: true,
      },
    });

    if (!assetWriteOff || assetWriteOff.deletedAt) {
      throw new NotFoundException('AssetWriteOff not found');
    }

    return plainToInstance(ResponseAssetWriteOffDto, assetWriteOff, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateAssetWriteOffDto: UpdateAssetWriteOffDto) {
    await this.findOne(id);

    const updatedAssetWriteOff = await this.prismaService.assetWriteOff.update({
      where: { id },
      data: updateAssetWriteOffDto,
      include: {
        Company: true,
        assets: true,
        accountings: true,
      },
    });

    return plainToInstance(ResponseAssetWriteOffDto, updatedAssetWriteOff, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.assetWriteOff.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa bản ghi ghi giảm tài sản thành công' };
  }
}
