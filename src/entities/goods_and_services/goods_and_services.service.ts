import { GoodAndServicePaginationResponseType } from './../../interfaces/good_and_service.interface';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGoodsAndServiceDto } from './dto/create-goods_and_service.dto';
import { UpdateGoodsAndServiceDto } from './dto/update-goods_and_service.dto';
import { GoodAndServiceFilterType } from 'src/interfaces/good_and_service.interface';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseGoodsAndServiceDto } from './dto/response-goods_and_service.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class GoodsAndServicesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(request: CreateGoodsAndServiceDto) {
    const existing = await this.prismaService.goodsAndServices.findFirst({
      where: {
        AND: [
          {
            code: request.code,
            customerId: request.customerId,
          },
        ],
      },
    });

    if (existing) {
      throw new ConflictException('Hàng hóa dịch vụ đã tồn tại');
    }

    const newItem = await this.prismaService.goodsAndServices.create({
      data: {
        ...request,
      },
    });

    return plainToInstance(ResponseGoodsAndServiceDto, newItem, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: GoodAndServiceFilterType,
  ): Promise<GoodAndServicePaginationResponseType> {
    const pageSize = Number(filters.pageSize) || 20;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';
    const customerId = filters.customerId || '';

    const skip = page > 1 ? (page - 1) * pageSize : 0;
    const condition: Prisma.GoodsAndServicesWhereInput = {
      AND: [
        ...(search
          ? [
              {
                OR: [
                  {
                    name: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    code: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                ],
              },
            ]
          : []),

        ...(customerId ? [{ customerId }] : []),

        { deletedAt: null },
      ],
    };

    const [response, total] = await Promise.all([
      this.prismaService.goodsAndServices.findMany({
        where: condition,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prismaService.goodsAndServices.count({ where: condition }),
    ]);

    return {
      data: plainToInstance(ResponseGoodsAndServiceDto, response, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string) {
    const item = await this.prismaService.goodsAndServices.findUnique({
      where: { id },
    });

    if (!item || item.deletedAt) {
      throw new NotFoundException('Không tìm thấy hàng hóa hoặc dịch vụ');
    }

    return plainToInstance(ResponseGoodsAndServiceDto, item, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, request: UpdateGoodsAndServiceDto) {
    await this.findOne(id);

    const duplicate = await this.prismaService.goodsAndServices.findFirst({
      where: {
        code: request.code,
        customerId: request.customerId,
        id: { not: id },
        deletedAt: null,
      },
    });

    if (duplicate) {
      throw new ConflictException('Mã hàng hóa dịch vụ đã tồn tại');
    }

    const updated = await this.prismaService.goodsAndServices.update({
      where: { id },
      data: request,
    });

    return plainToInstance(ResponseGoodsAndServiceDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prismaService.goodsAndServices.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Xóa thành công' };
  }
}
