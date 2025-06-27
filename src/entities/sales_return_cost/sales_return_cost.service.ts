import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalesReturnCostDto } from './dto/create-sales_return_cost.dto';
import { UpdateSalesReturnCostDto } from './dto/update-sales_return_cost.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseSalesReturnCostDto } from './dto/response-sales_return_cost.dto';

@Injectable()
export class SalesReturnCostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSalesReturnCostDto: CreateSalesReturnCostDto) {
    const {
      goodId,
      warehouseId,
      warehouseAccountId,
      cogsAccountId,
      salesReturnId,
      quantity,
      unitPrice,
      totalCost,
    } = createSalesReturnCostDto;

    const salesReturnCost = await this.prismaService.salesReturnCost.create({
      data: {
        ...(goodId && {
          Goods: {
            connect: { id: goodId },
          },
        }),
        ...(warehouseId && {
          Warehouse: {
            connect: { id: warehouseId },
          },
        }),
        ...(warehouseAccountId && {
          WarehouseAccount: {
            connect: { id: warehouseAccountId },
          },
        }),
        ...(cogsAccountId && {
          CogsAccount: {
            connect: { id: cogsAccountId },
          },
        }),
        ...(salesReturnId && {
          SalesReturn: {
            connect: { id: salesReturnId },
          },
        }),
        quantity,
        unitPrice,
        totalCost,
      },
      include: {
        Goods: true,
        Warehouse: true,
        WarehouseAccount: true,
        CogsAccount: true,
        SalesReturn: true,
      },
    });

    return plainToInstance(ResponseSalesReturnCostDto, salesReturnCost, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const salesReturnCosts = await this.prismaService.salesReturnCost.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Goods: true,
        Warehouse: true,
        WarehouseAccount: true,
        CogsAccount: true,
        SalesReturn: true,
      },
    });

    return plainToInstance(ResponseSalesReturnCostDto, salesReturnCosts, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const salesReturnCost = await this.prismaService.salesReturnCost.findUnique(
      {
        where: { id },
        include: {
          Goods: true,
          Warehouse: true,
          WarehouseAccount: true,
          CogsAccount: true,
          SalesReturn: true,
        },
      },
    );

    if (!salesReturnCost || salesReturnCost.deletedAt) {
      throw new NotFoundException('SalesReturnCost not found');
    }

    return plainToInstance(ResponseSalesReturnCostDto, salesReturnCost, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateSalesReturnCostDto: UpdateSalesReturnCostDto) {
    await this.findOne(id);

    const updatedSalesReturnCost =
      await this.prismaService.salesReturnCost.update({
        where: { id },
        data: updateSalesReturnCostDto,
        include: {
          Goods: true,
          Warehouse: true,
          WarehouseAccount: true,
          CogsAccount: true,
          SalesReturn: true,
        },
      });

    return plainToInstance(ResponseSalesReturnCostDto, updatedSalesReturnCost, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.salesReturnCost.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa giá vốn hàng bị trả lại thành công' };
  }
}
