import { Prisma } from 'generated/prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryInItemDto } from './dto/create-inventory_in_item.dto';
import { UpdateInventoryInItemDto } from './dto/update-inventory_in_item.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseInventoryInItemDto } from './dto/response-inventory_in_item.dto';
import {
  InventoryInItemFilterType,
  InventoryInItemPaginationResponseType,
} from 'src/interfaces/inventory_in_item.interface';

@Injectable()
export class InventoryInItemService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createInventoryInItemDto: CreateInventoryInItemDto) {
    // Create new inventory in item
    const inventoryInItem = await this.prismaService.inventoryInItem.create({
      data: createInventoryInItemDto,
      include: {
        item: true,
        unit: true,
        warehouse: true,
        creditAccount: true,
        debitAccount: true,
        inventoryIn: true,
      },
    });

    return plainToInstance(ResponseInventoryInItemDto, inventoryInItem, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: InventoryInItemFilterType,
  ): Promise<InventoryInItemPaginationResponseType> {
    const pageSize = Number(filters.pageSize) || 20;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';

    const skip = page > 1 ? (page - 1) * pageSize : 0;

    const condition: Prisma.InventoryInItemWhereInput = {
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

    const [inventoryInItems, total] = await Promise.all([
      this.prismaService.inventoryInItem.findMany({
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
          inventoryIn: true,
        },
      }),

      this.prismaService.inventoryInItem.count({ where: condition }),
    ]);

    return {
      data: plainToInstance(ResponseInventoryInItemDto, inventoryInItems, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string) {
    const inventoryInItem = await this.prismaService.inventoryInItem.findUnique(
      {
        where: { id },
        include: {
          item: true,
          unit: true,
          warehouse: true,
          creditAccount: true,
          debitAccount: true,
          inventoryIn: true,
        },
      },
    );

    if (!inventoryInItem || inventoryInItem.deletedAt) {
      throw new NotFoundException('Inventory receipt item not found');
    }

    return plainToInstance(ResponseInventoryInItemDto, inventoryInItem, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateInventoryInItemDto: UpdateInventoryInItemDto) {
    // Check if the inventory in item exists
    await this.findOne(id);

    const updated = await this.prismaService.inventoryInItem.update({
      where: { id },
      data: updateInventoryInItemDto,
      include: {
        item: true,
        unit: true,
        warehouse: true,
        creditAccount: true,
        debitAccount: true,
        inventoryIn: true,
      },
    });

    return plainToInstance(ResponseInventoryInItemDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the inventory in item exists
    await this.findOne(id);

    // Soft delete the inventory in item
    await this.prismaService.inventoryInItem.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Xóa item phiếu nhập kho thành công' };
  }
}
