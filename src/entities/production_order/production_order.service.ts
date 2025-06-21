import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductionOrderDto } from './dto/create-production_order.dto';
import { UpdateProductionOrderDto } from './dto/update-production_order.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseProductionOrderDto } from './dto/response-production_order.dto';
import {
  ProductionOrderFilterType,
  ProductionOrderPaginationResponseType,
} from 'src/interfaces/production_order.interface';
import { Prisma } from 'generated/prisma';

@Injectable()
export class ProductionOrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductionOrderDto: CreateProductionOrderDto) {
    const newItem = await this.prismaService.productionOrders.create({
      data: createProductionOrderDto,
    });

    return plainToInstance(ResponseProductionOrderDto, newItem, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: ProductionOrderFilterType,
  ): Promise<ProductionOrderPaginationResponseType> {
    const pageSize = Number(filters.pageSize) || 20;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';

    const skip = page > 1 ? (page - 1) * pageSize : 0;

    const condition: Prisma.productionOrdersWhereInput = {
      AND: [
        ...(search
          ? [
              {
                OR: [
                  {
                    description: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                ],
              },
            ]
          : []),

        { deletedAt: null },
      ],
    };

    const [response, total] = await Promise.all([
      this.prismaService.productionOrders.findMany({
        where: condition,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prismaService.productionOrders.count({ where: condition }),
    ]);
    return {
      data: plainToInstance(ResponseProductionOrderDto, response, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string) {
    const productionOrder =
      await this.prismaService.productionOrders.findUnique({
        where: { id },
        include: {
          inventoryOutItem: {
            include: {
              item: true,
              unit: true,
              warehouse: true,
              creditAccount: true,
              debitAccount: true,
            },
          },
        },
      });

    if (!productionOrder || productionOrder.deletedAt) {
      throw new NotFoundException('Production order not found');
    }

    return plainToInstance(ResponseProductionOrderDto, productionOrder, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateProductionOrderDto: UpdateProductionOrderDto) {
    // Check if the production order exists
    await this.findOne(id);

    const updated = await this.prismaService.productionOrders.update({
      where: { id },
      data: updateProductionOrderDto,
      include: {
        inventoryOutItem: {
          include: {
            item: true,
            unit: true,
            warehouse: true,
            creditAccount: true,
            debitAccount: true,
          },
        },
      },
    });

    return plainToInstance(ResponseProductionOrderDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the production order exists
    await this.findOne(id);

    // Soft delete the production order
    await this.prismaService.productionOrders.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Xóa lệnh sản xuất thành công' };
  }
}
