import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGoodsAndServicesGroupDto } from './dto/create-goods_and_services_group.dto';
import { UpdateGoodsAndServicesGroupDto } from './dto/update-goods_and_services_group.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseGoodsAndServicesGroupDto } from './dto/response-goods_and_services_group.dto';
import {
  GoodAndServiceGroupFilterType,
  GoodAndServiceGroupPaginationResponseType,
} from 'src/interfaces/good_and_service_group.interface';
import { Prisma } from 'generated/prisma';

@Injectable()
export class GoodsAndServicesGroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(request: CreateGoodsAndServicesGroupDto) {
    const existingGoodAndServiceGroup =
      await this.prismaService.goodsAndServicesGroup.findFirst({
        where: {
          AND: [
            {
              code: request.code,
              customerId: request.customerId,
              deletedAt: null,
            },
          ],
        },
      });

    if (existingGoodAndServiceGroup) {
      throw new ConflictException('Goods and services group already exists');
    }

    if (request.parentGroupId != null) {
      const exists = await this.prismaService.goodsAndServicesGroup.findUnique({
        where: { id: request.parentGroupId },
      });

      if (!exists) {
        throw new NotFoundException(
          'Parent group for goods and services "parentGroupId" not found',
        );
      }
    }

    const newGroup = await this.prismaService.goodsAndServicesGroup.create({
      data: request,
    });

    return plainToInstance(ResponseGoodsAndServicesGroupDto, newGroup, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: GoodAndServiceGroupFilterType,
  ): Promise<GoodAndServiceGroupPaginationResponseType> {
    const pageSize = Number(filters.pageSize) || 20;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';
    const customerId = filters.customerId || '';

    const skip = page > 1 ? (page - 1) * pageSize : 0;
    const condition: Prisma.GoodsAndServicesGroupWhereInput = {
      AND: [
        ...(search
          ? [
              {
                OR: [
                  {
                    code: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    name: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    status: {
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
      this.prismaService.goodsAndServicesGroup.findMany({
        where: condition,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),

      this.prismaService.goodsAndServicesGroup.count({ where: condition }),
    ]);

    return {
      data: plainToInstance(ResponseGoodsAndServicesGroupDto, response, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string) {
    const groupItem = await this.prismaService.goodsAndServicesGroup.findUnique(
      {
        where: { id },
      },
    );

    if (!groupItem || groupItem.deletedAt) {
      throw new NotFoundException('Goods and services group not found');
    }

    return plainToInstance(ResponseGoodsAndServicesGroupDto, groupItem, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, request: UpdateGoodsAndServicesGroupDto) {
    await this.findOne(id);

    const duplicate = await this.prismaService.goodsAndServicesGroup.findFirst({
      where: {
        code: request.code,
        customerId: request.customerId,
        id: { not: id },
        deletedAt: null,
      },
    });
    if (duplicate) {
      throw new ConflictException(
        'Goods and services group code already exists',
      );
    }

    if (request.parentGroupId != null) {
      const exists = await this.prismaService.goodsAndServicesGroup.findUnique({
        where: { id: request.parentGroupId, deletedAt: null },
      });

      if (!exists) {
        throw new NotFoundException(
          'Parent group for goods and services "parentGroupId" not found',
        );
      }
    }

    const updatedEntity = await this.prismaService.goodsAndServicesGroup.update(
      {
        where: { id },
        data: request,
      },
    );

    return plainToInstance(ResponseGoodsAndServicesGroupDto, updatedEntity, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.goodsAndServicesGroup.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Successfully deleted' };
  }
}
