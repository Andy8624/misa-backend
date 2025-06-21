import { Prisma } from 'generated/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryOutItemDto } from './dto/create-inventory_out_item.dto';
import { UpdateInventoryOutItemDto } from './dto/update-inventory_out_item.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseInventoryOutItemDto } from './dto/response-inventory_out_item.dto';
import {
  InventoryOutItemFilterType,
  InventoryOutItemPaginationResponseType,
} from 'src/interfaces/inventory_out_item.interface';

@Injectable()
export class InventoryOutItemService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createInventoryOutItemDto: CreateInventoryOutItemDto) {
    // Create new inventory out item
    const inventoryOutItem = await this.prismaService.inventoryOutItem.create({
      data: createInventoryOutItemDto,
      include: {
        item: true,
        unit: true,
        warehouse: true,
        creditAccount: true,
        debitAccount: true,
        inventoryOut: true,
        productionOrders: true,
      },
    });

    return plainToInstance(ResponseInventoryOutItemDto, inventoryOutItem, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: InventoryOutItemFilterType,
  ): Promise<InventoryOutItemPaginationResponseType> {
    const pageSize = Number(filters.pageSize) || 20;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';

    const skip = page > 1 ? (page - 1) * pageSize : 0;

    const condition: Prisma.InventoryOutItemWhereInput = {
      AND: [
        ...(search
          ? [
              {
                OR: [
                  {
                    itemName: {
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

    const [inventoryOutItems, total] = await Promise.all([
      this.prismaService.inventoryOutItem.findMany({
        where: condition,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          item: true,
          unit: true,
          warehouse: true,
          creditAccount: true,
          debitAccount: true,
          inventoryOut: true,
          productionOrders: true,
        },
      }),

      this.prismaService.inventoryOutItem.count({ where: condition }),
    ]);

    return {
      data: plainToInstance(ResponseInventoryOutItemDto, inventoryOutItems, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string) {
    const inventoryOutItem =
      await this.prismaService.inventoryOutItem.findUnique({
        where: { id },
        include: {
          item: true,
          unit: true,
          warehouse: true,
          creditAccount: true,
          debitAccount: true,
          inventoryOut: true,
          productionOrders: true,
        },
      });

    if (!inventoryOutItem || inventoryOutItem.deletedAt) {
      throw new NotFoundException('Inventory out item not found');
    }

    return plainToInstance(ResponseInventoryOutItemDto, inventoryOutItem, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: string,
    updateInventoryOutItemDto: UpdateInventoryOutItemDto,
  ) {
    // Check if the inventory out item exists
    await this.findOne(id);

    const updated = await this.prismaService.inventoryOutItem.update({
      where: { id },
      data: updateInventoryOutItemDto,
      include: {
        item: true,
        unit: true,
        warehouse: true,
        creditAccount: true,
        debitAccount: true,
        inventoryOut: true,
        productionOrders: true,
      },
    });

    return plainToInstance(ResponseInventoryOutItemDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the inventory out item exists
    await this.findOne(id);

    // Soft delete the inventory out item
    await this.prismaService.inventoryOutItem.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Xóa item phiếu xuất kho thành công' };
  }
}
