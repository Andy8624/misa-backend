import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetComponentDto } from './dto/create-asset_component.dto';
import { UpdateAssetComponentDto } from './dto/update-asset_component.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetComponentDto } from './dto/response-asset_component.dto';

@Injectable()
export class AssetComponentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAssetComponentDto: CreateAssetComponentDto) {
    const assetComponent = await this.prismaService.assetComponent.create({
      data: createAssetComponentDto,
      include: {
        AssetIncrement: true,
        Company: true,
      },
    });

    return plainToInstance(ResponseAssetComponentDto, assetComponent, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const assetComponents = await this.prismaService.assetComponent.findMany({
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

    return plainToInstance(ResponseAssetComponentDto, assetComponents, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const assetComponent = await this.prismaService.assetComponent.findUnique({
      where: { id },
      include: {
        AssetIncrement: true,
        Company: true,
      },
    });

    if (!assetComponent || assetComponent.deletedAt) {
      throw new NotFoundException('AssetComponent not found');
    }

    return plainToInstance(ResponseAssetComponentDto, assetComponent, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateAssetComponentDto: UpdateAssetComponentDto) {
    await this.findOne(id);

    const updatedAssetComponent =
      await this.prismaService.assetComponent.update({
        where: { id },
        data: updateAssetComponentDto,
        include: {
          AssetIncrement: true,
          Company: true,
        },
      });

    return plainToInstance(ResponseAssetComponentDto, updatedAssetComponent, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.assetComponent.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa bộ phận cấu thành tài sản thành công' };
  }
}
