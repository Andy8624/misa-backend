import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetFormationOriginDto } from './dto/create-asset_formation_origin.dto';
import { UpdateAssetFormationOriginDto } from './dto/update-asset_formation_origin.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetFormationOriginDto } from './dto/response-asset_formation_origin.dto';

@Injectable()
export class AssetFormationOriginService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAssetFormationOriginDto: CreateAssetFormationOriginDto) {
    const assetFormationOrigin =
      await this.prismaService.assetFormationOrigin.create({
        data: createAssetFormationOriginDto,
        include: {
          AssetIncrement: true,
          DebitAccount: true,
          CreditAccount: true,
          Company: true,
        },
      });

    return plainToInstance(
      ResponseAssetFormationOriginDto,
      assetFormationOrigin,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findAll() {
    const assetFormationOrigins =
      await this.prismaService.assetFormationOrigin.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          AssetIncrement: true,
          DebitAccount: true,
          CreditAccount: true,
          Company: true,
        },
      });

    return plainToInstance(
      ResponseAssetFormationOriginDto,
      assetFormationOrigins,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findOne(id: string) {
    const assetFormationOrigin =
      await this.prismaService.assetFormationOrigin.findUnique({
        where: { id },
        include: {
          AssetIncrement: true,
          DebitAccount: true,
          CreditAccount: true,
          Company: true,
        },
      });

    if (!assetFormationOrigin || assetFormationOrigin.deletedAt) {
      throw new NotFoundException('AssetFormationOrigin not found');
    }

    return plainToInstance(
      ResponseAssetFormationOriginDto,
      assetFormationOrigin,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async update(
    id: string,
    updateAssetFormationOriginDto: UpdateAssetFormationOriginDto,
  ) {
    await this.findOne(id);

    const updatedAssetFormationOrigin =
      await this.prismaService.assetFormationOrigin.update({
        where: { id },
        data: updateAssetFormationOriginDto,
        include: {
          AssetIncrement: true,
          DebitAccount: true,
          CreditAccount: true,
          Company: true,
        },
      });

    return plainToInstance(
      ResponseAssetFormationOriginDto,
      updatedAssetFormationOrigin,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.assetFormationOrigin.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa nguồn gốc hình thành tài sản thành công' };
  }
}
