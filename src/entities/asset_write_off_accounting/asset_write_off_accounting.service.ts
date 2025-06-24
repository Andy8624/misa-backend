import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetWriteOffAccountingDto } from './dto/create-asset_write_off_accounting.dto';
import { UpdateAssetWriteOffAccountingDto } from './dto/update-asset_write_off_accounting.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetWriteOffAccountingDto } from './dto/response-asset_write_off_accounting.dto';

@Injectable()
export class AssetWriteOffAccountingService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createAssetWriteOffAccountingDto: CreateAssetWriteOffAccountingDto,
  ) {
    const assetWriteOffAccounting =
      await this.prismaService.assetWriteOffAccounting.create({
        data: createAssetWriteOffAccountingDto,
        include: {
          AssetWriteOff: true,
          DebitAccount: true,
          CreditAccount: true,
          Company: true,
        },
      });

    return plainToInstance(
      ResponseAssetWriteOffAccountingDto,
      assetWriteOffAccounting,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findAll() {
    const assetWriteOffAccountings =
      await this.prismaService.assetWriteOffAccounting.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          AssetWriteOff: true,
          DebitAccount: true,
          CreditAccount: true,
          Company: true,
        },
      });

    return plainToInstance(
      ResponseAssetWriteOffAccountingDto,
      assetWriteOffAccountings,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findOne(id: string) {
    const assetWriteOffAccounting =
      await this.prismaService.assetWriteOffAccounting.findUnique({
        where: { id },
        include: {
          AssetWriteOff: true,
          DebitAccount: true,
          CreditAccount: true,
          Company: true,
        },
      });

    if (!assetWriteOffAccounting || assetWriteOffAccounting.deletedAt) {
      throw new NotFoundException('AssetWriteOffAccounting not found');
    }

    return plainToInstance(
      ResponseAssetWriteOffAccountingDto,
      assetWriteOffAccounting,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async update(
    id: string,
    updateAssetWriteOffAccountingDto: UpdateAssetWriteOffAccountingDto,
  ) {
    await this.findOne(id);

    const updatedAssetWriteOffAccounting =
      await this.prismaService.assetWriteOffAccounting.update({
        where: { id },
        data: updateAssetWriteOffAccountingDto,
        include: {
          AssetWriteOff: true,
          DebitAccount: true,
          CreditAccount: true,
          Company: true,
        },
      });

    return plainToInstance(
      ResponseAssetWriteOffAccountingDto,
      updatedAssetWriteOffAccounting,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.assetWriteOffAccounting.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa hoạch toán ghi giảm tài sản thành công' };
  }
}
