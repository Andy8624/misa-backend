import { Prisma } from 'generated/prisma';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseWarehouseDto } from './dto/response-warehouse.dto';
import {
  WarehouseFilterType,
  WarehousePaginationResponseType,
} from 'src/interfaces/warehouse.interface';

@Injectable()
export class WarehouseService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createWarehouseDto: CreateWarehouseDto) {
    const existingWarehouse = await this.prismaService.warehouse.findFirst({
      where: {
        code: createWarehouseDto.code,
        customerId: createWarehouseDto.customerId,
        deletedAt: null,
      },
    });

    if (existingWarehouse) {
      throw new ConflictException('Kho đã tồn tại');
    }

    const warehouse = await this.prismaService.warehouse.create({
      data: createWarehouseDto,
    });

    return plainToInstance(ResponseWarehouseDto, warehouse, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: WarehouseFilterType,
  ): Promise<WarehousePaginationResponseType> {
    const pageSize = Number(filters.pageSize) || 20;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';
    const customerId = filters.customerId || '';

    const skip = page > 1 ? (page - 1) * pageSize : 0;

    const condition: Prisma.WarehouseWhereInput = {
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

    const [warehouses, total] = await Promise.all([
      this.prismaService.warehouse.findMany({
        where: condition,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          ChartOfAccount: true,
        },
      }),

      this.prismaService.warehouse.count({ where: condition }),
    ]);

    return {
      data: plainToInstance(ResponseWarehouseDto, warehouses, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string) {
    const warehouse = await this.prismaService.warehouse.findUnique({
      where: { id },
      include: {
        ChartOfAccount: true,
      },
    });

    if (!warehouse || warehouse.deletedAt) {
      throw new NotFoundException('Không tìm thấy kho');
    }

    return plainToInstance(ResponseWarehouseDto, warehouse, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateWarehouseDto: UpdateWarehouseDto) {
    const existing = await this.findOne(id);

    if (updateWarehouseDto.code && updateWarehouseDto.code !== existing.code) {
      const exists = await this.prismaService.warehouse.findFirst({
        where: {
          code: updateWarehouseDto.code,
          customerId: existing.customerId,
          id: { not: id },
          deletedAt: null,
        },
      });

      if (exists) {
        throw new ConflictException('Kho với mã này đã tồn tại');
      }
    }

    const updated = await this.prismaService.warehouse.update({
      where: { id },
      data: updateWarehouseDto,
      include: {
        ChartOfAccount: true,
      },
    });

    return plainToInstance(ResponseWarehouseDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prismaService.warehouse.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Xóa kho thành công' };
  }
}
