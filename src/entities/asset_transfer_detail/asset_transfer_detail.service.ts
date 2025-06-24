import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetTransferDetailDto } from './dto/create-asset_transfer_detail.dto';
import { UpdateAssetTransferDetailDto } from './dto/update-asset_transfer_detail.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetTransferDetailDto } from './dto/response-asset_transfer_detail.dto';

@Injectable()
export class AssetTransferDetailService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAssetTransferDetailDto: CreateAssetTransferDetailDto) {
    const assetTransferDetail =
      await this.prismaService.assetTransferDetail.create({
        data: createAssetTransferDetailDto,
        include: {
          Asset: true,
          FromDepartment: true,
          ToDepartment: true,
          ExpenseAccount: true,
          AssetTransfer: true,
          Company: true,
        },
      });

    return plainToInstance(
      ResponseAssetTransferDetailDto,
      assetTransferDetail,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findAll() {
    const assetTransferDetails =
      await this.prismaService.assetTransferDetail.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          Asset: true,
          FromDepartment: true,
          ToDepartment: true,
          ExpenseAccount: true,
          AssetTransfer: true,
          Company: true,
        },
      });

    return plainToInstance(
      ResponseAssetTransferDetailDto,
      assetTransferDetails,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findOne(id: string) {
    const assetTransferDetail =
      await this.prismaService.assetTransferDetail.findUnique({
        where: { id },
        include: {
          Asset: true,
          FromDepartment: true,
          ToDepartment: true,
          ExpenseAccount: true,
          AssetTransfer: true,
          Company: true,
        },
      });

    if (!assetTransferDetail || assetTransferDetail.deletedAt) {
      throw new NotFoundException('AssetTransferDetail not found');
    }

    return plainToInstance(
      ResponseAssetTransferDetailDto,
      assetTransferDetail,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async update(
    id: string,
    updateAssetTransferDetailDto: UpdateAssetTransferDetailDto,
  ) {
    await this.findOne(id);

    const updatedAssetTransferDetail =
      await this.prismaService.assetTransferDetail.update({
        where: { id },
        data: updateAssetTransferDetailDto,
        include: {
          Asset: true,
          FromDepartment: true,
          ToDepartment: true,
          ExpenseAccount: true,
          AssetTransfer: true,
          Company: true,
        },
      });

    return plainToInstance(
      ResponseAssetTransferDetailDto,
      updatedAssetTransferDetail,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.assetTransferDetail.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa chi tiết điều chuyển tài sản thành công' };
  }
}
