import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetRevaluationPostingDto } from './dto/create-asset_revaluation_posting.dto';
import { UpdateAssetRevaluationPostingDto } from './dto/update-asset_revaluation_posting.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetRevaluationPostingDto } from './dto/response-asset_revaluation_posting.dto';

@Injectable()
export class AssetRevaluationPostingService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createAssetRevaluationPostingDto: CreateAssetRevaluationPostingDto,
  ) {
    const assetRevaluationPosting =
      await this.prismaService.assetRevaluationPosting.create({
        data: createAssetRevaluationPostingDto,
        include: {
          Department: true,
          Object: true,
          DebitAccount: true,
          CreditAccount: true,
          AssetRevaluation: true,
          Company: true,
        },
      });

    return plainToInstance(
      ResponseAssetRevaluationPostingDto,
      assetRevaluationPosting,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findAll() {
    const assetRevaluationPostings =
      await this.prismaService.assetRevaluationPosting.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          Department: true,
          Object: true,
          DebitAccount: true,
          CreditAccount: true,
          AssetRevaluation: true,
          Company: true,
        },
      });

    return plainToInstance(
      ResponseAssetRevaluationPostingDto,
      assetRevaluationPostings,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findOne(id: string) {
    const assetRevaluationPosting =
      await this.prismaService.assetRevaluationPosting.findUnique({
        where: { id },
        include: {
          Department: true,
          Object: true,
          DebitAccount: true,
          CreditAccount: true,
          AssetRevaluation: true,
          Company: true,
        },
      });

    if (!assetRevaluationPosting || assetRevaluationPosting.deletedAt) {
      throw new NotFoundException('AssetRevaluationPosting not found');
    }

    return plainToInstance(
      ResponseAssetRevaluationPostingDto,
      assetRevaluationPosting,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async update(
    id: string,
    updateAssetRevaluationPostingDto: UpdateAssetRevaluationPostingDto,
  ) {
    await this.findOne(id);

    const updatedAssetRevaluationPosting =
      await this.prismaService.assetRevaluationPosting.update({
        where: { id },
        data: updateAssetRevaluationPostingDto,
        include: {
          Department: true,
          Object: true,
          DebitAccount: true,
          CreditAccount: true,
          AssetRevaluation: true,
          Company: true,
        },
      });

    return plainToInstance(
      ResponseAssetRevaluationPostingDto,
      updatedAssetRevaluationPosting,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.assetRevaluationPosting.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa hạch toán đánh giá lại tài sản thành công' };
  }
}
