import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGoodsAndServicesMappingDto } from './dto/create-goods_and_services_mapping.dto';
import { UpdateGoodsAndServicesMappingDto } from './dto/update-goods_and_services_mapping.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseGoodsAndServicesMappingDto } from './dto/response-goods_and_services_mapping.dto';
import {
  GoodAndServiceMappingFilterType,
  GoodAndServiceMappingPaginationResponseType,
} from 'src/interfaces/good_and_service_mapping.interface';
import { Prisma } from 'generated/prisma';

@Injectable()
export class GoodsAndServicesMappingService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(request: CreateGoodsAndServicesMappingDto) {
    const existing =
      await this.prismaService.goodsAndServicesGroupMapping.findFirst({
        where: {
          AND: [
            {
              goodsAndServicesId: request.goodsAndServicesId,
              goodsAndServicesGroupId: request.goodsAndServicesGroupId,
            },
          ],
        },
      });

    if (existing) {
      throw new ConflictException('Dữ liệu đã tồn tại');
    }

    const newItem =
      await this.prismaService.goodsAndServicesGroupMapping.create({
        data: request,
      });

    return plainToInstance(ResponseGoodsAndServicesMappingDto, newItem, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: GoodAndServiceMappingFilterType,
  ): Promise<GoodAndServiceMappingPaginationResponseType> {
    const pageSize = Number(filters.pageSize) || 20;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';

    const skip = page > 1 ? (page - 1) * pageSize : 0;

    const condition: Prisma.GoodsAndServicesGroupMappingWhereInput = {
      AND: [
        ...(search
          ? [
              {
                OR: [
                  {
                    goodsAndServicesId: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    goodsAndServicesGroupId: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                ],
              },
            ]
          : []),
      ],
    };

    const [response, total] = await Promise.all([
      this.prismaService.goodsAndServicesGroupMapping.findMany({
        where: condition,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prismaService.goodsAndServicesGroupMapping.count({
        where: condition,
      }),
    ]);

    return {
      data: plainToInstance(ResponseGoodsAndServicesMappingDto, response, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string) {
    const item =
      await this.prismaService.goodsAndServicesGroupMapping.findUnique({
        where: { id },
      });

    if (!item) {
      throw new NotFoundException('Không tìm thấy');
    }

    return plainToInstance(ResponseGoodsAndServicesMappingDto, item, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, request: UpdateGoodsAndServicesMappingDto) {
    await this.findOne(id);

    const duplicate =
      await this.prismaService.goodsAndServicesGroupMapping.findFirst({
        where: {
          goodsAndServicesId: request.goodsAndServicesId,
          goodsAndServicesGroupId: request.goodsAndServicesGroupId,
          id: { not: id },
        },
      });

    if (duplicate) {
      throw new ConflictException('Đã tồn tại');
    }

    const updated =
      await this.prismaService.goodsAndServicesGroupMapping.update({
        where: { id },
        data: request,
      });

    return plainToInstance(ResponseGoodsAndServicesMappingDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prismaService.goodsAndServicesGroupMapping.delete({
      where: { id },
    });

    return { message: 'Xóa thành công' };
  }
}
