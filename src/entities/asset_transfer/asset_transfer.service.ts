import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetTransferDto } from './dto/create-asset_transfer.dto';
import { UpdateAssetTransferDto } from './dto/update-asset_transfer.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetTransferDto } from './dto/response-asset_transfer.dto';

@Injectable()
export class AssetTransferService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAssetTransferDto: CreateAssetTransferDto) {
    const assetTransfer = await this.prismaService.assetTransfer.create({
      data: createAssetTransferDto,
      include: {
        DeliveredBy: true,
        ReceivedBy: true,
        Company: true,
        AssetTransferDetail_AssetTransfer: true, // Bao gồm bảng con
      },
    });

    return plainToInstance(ResponseAssetTransferDto, assetTransfer, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const assetTransfers = await this.prismaService.assetTransfer.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        DeliveredBy: true,
        ReceivedBy: true,
        Company: true,
        AssetTransferDetail_AssetTransfer: true,
      },
    });

    return plainToInstance(ResponseAssetTransferDto, assetTransfers, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const assetTransfer = await this.prismaService.assetTransfer.findUnique({
      where: { id },
      include: {
        DeliveredBy: true,
        ReceivedBy: true,
        Company: true,
        AssetTransferDetail_AssetTransfer: true,
      },
    });

    if (!assetTransfer || assetTransfer.deletedAt) {
      throw new NotFoundException('AssetTransfer not found');
    }

    return plainToInstance(ResponseAssetTransferDto, assetTransfer, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateAssetTransferDto: UpdateAssetTransferDto) {
    await this.findOne(id);

    const updatedAssetTransfer = await this.prismaService.assetTransfer.update({
      where: { id },
      data: updateAssetTransferDto,
      include: {
        DeliveredBy: true,
        ReceivedBy: true,
        Company: true,
        AssetTransferDetail_AssetTransfer: true,
      },
    });

    return plainToInstance(ResponseAssetTransferDto, updatedAssetTransfer, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.assetTransfer.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa điều chuyển tài sản thành công' };
  }
}
