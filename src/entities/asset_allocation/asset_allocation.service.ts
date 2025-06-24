import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetAllocationDto } from './dto/create-asset_allocation.dto';
import { UpdateAssetAllocationDto } from './dto/update-asset_allocation.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetAllocationDto } from './dto/response-asset_allocation.dto';

@Injectable()
export class AssetAllocationService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAssetAllocationDto: CreateAssetAllocationDto) {
    const assetAllocation = await this.prismaService.assetAllocation.create({
      data: createAssetAllocationDto,
      include: {
        AssetIncrement: true,
        ExpenseAccount: true,
        object: true,
        Company: true,
      },
    });

    return plainToInstance(ResponseAssetAllocationDto, assetAllocation, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const assetAllocations = await this.prismaService.assetAllocation.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        AssetIncrement: true,
        ExpenseAccount: true,
        object: true,
        Company: true,
      },
    });

    return plainToInstance(ResponseAssetAllocationDto, assetAllocations, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const assetAllocation = await this.prismaService.assetAllocation.findUnique(
      {
        where: { id },
        include: {
          AssetIncrement: true,
          ExpenseAccount: true,
          object: true,
          Company: true,
        },
      },
    );

    if (!assetAllocation || assetAllocation.deletedAt) {
      throw new NotFoundException('AssetAllocation not found');
    }

    return plainToInstance(ResponseAssetAllocationDto, assetAllocation, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateAssetAllocationDto: UpdateAssetAllocationDto) {
    await this.findOne(id);

    const updatedAssetAllocation =
      await this.prismaService.assetAllocation.update({
        where: { id },
        data: updateAssetAllocationDto,
        include: {
          AssetIncrement: true,
          ExpenseAccount: true,
          object: true,
          Company: true,
        },
      });

    return plainToInstance(ResponseAssetAllocationDto, updatedAssetAllocation, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.assetAllocation.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa thiết lập phân bổ tài sản thành công' };
  }
}
