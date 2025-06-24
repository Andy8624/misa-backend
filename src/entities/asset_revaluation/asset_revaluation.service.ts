import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetRevaluationDto } from './dto/create-asset_revaluation.dto';
import { UpdateAssetRevaluationDto } from './dto/update-asset_revaluation.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetRevaluationDto } from './dto/response-asset_revaluation.dto';

@Injectable()
export class AssetRevaluationService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAssetRevaluationDto: CreateAssetRevaluationDto) {
    const assetRevaluation = await this.prismaService.assetRevaluation.create({
      data: createAssetRevaluationDto,
      include: {
        Company: true,
        details: true, // Bao gồm các bảng con
        postings: true, // Bao gồm các bảng con
      },
    });

    return plainToInstance(ResponseAssetRevaluationDto, assetRevaluation, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const assetRevaluations =
      await this.prismaService.assetRevaluation.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          Company: true,
          details: true,
          postings: true,
        },
      });

    return plainToInstance(ResponseAssetRevaluationDto, assetRevaluations, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const assetRevaluation =
      await this.prismaService.assetRevaluation.findUnique({
        where: { id },
        include: {
          Company: true,
          details: true,
          postings: true,
        },
      });

    if (!assetRevaluation || assetRevaluation.deletedAt) {
      throw new NotFoundException('AssetRevaluation not found');
    }

    return plainToInstance(ResponseAssetRevaluationDto, assetRevaluation, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: string,
    updateAssetRevaluationDto: UpdateAssetRevaluationDto,
  ) {
    await this.findOne(id);

    const updatedAssetRevaluation =
      await this.prismaService.assetRevaluation.update({
        where: { id },
        data: updateAssetRevaluationDto,
        include: {
          Company: true,
          details: true,
          postings: true,
        },
      });

    return plainToInstance(
      ResponseAssetRevaluationDto,
      updatedAssetRevaluation,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.assetRevaluation.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa đánh giá lại tài sản thành công' };
  }
}
