import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWarrantyPeriodDto } from './dto/create-warranty_period.dto';
import { UpdateWarrantyPeriodDto } from './dto/update-warranty_period.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseWarrantyPeriodDto } from './dto/response--warranty_period.dto';
import { WarrantyPeriodFilterType } from 'src/interfaces/warranty_period.interface';
import { Prisma } from 'generated/prisma';

@Injectable()
export class WarrantyPeriodService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(request: CreateWarrantyPeriodDto) {
    const existing = await this.prismaService.warrantyPeriod.findFirst({
      where: {
        AND: [
          {
            description: request.description,
          },
        ],
      },
    });

    if (existing) {
      throw new ConflictException('Bảo hành đã tồn tại');
    }

    const newWarranty = await this.prismaService.warrantyPeriod.create({
      data: request,
    });

    return plainToInstance(ResponseWarrantyPeriodDto, newWarranty, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(filters: WarrantyPeriodFilterType) {
    const pageSize = Number(filters.pageSize) || 20;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';
    const customerId = filters.customerId || '';

    const skip = page > 1 ? (page - 1) * pageSize : 0;

    const condition: Prisma.WarrantyPeriodWhereInput = {
      AND: [
        ...(search
          ? [
              {
                description: {
                  contains: search,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            ]
          : []),

        ...(customerId ? [{ customerId }] : []),

        { deletedAt: null },
      ],
    };

    const [response, total] = await Promise.all([
      this.prismaService.warrantyPeriod.findMany({
        where: condition,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),

      this.prismaService.warrantyPeriod.count({ where: condition }),
    ]);

    return {
      data: plainToInstance(ResponseWarrantyPeriodDto, response, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string) {
    const warranty = await this.prismaService.warrantyPeriod.findUnique({
      where: { id },
    });

    if (!warranty || warranty.deletedAt) {
      throw new NotFoundException('Không tìm thấy bảo hành');
    }

    return plainToInstance(ResponseWarrantyPeriodDto, warranty, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, request: UpdateWarrantyPeriodDto) {
    await this.findOne(id);
    const duplicate = await this.prismaService.warrantyPeriod.findFirst({
      where: {
        description: request.description,
        customerId: request.customerId,
        id: { not: id },
        deletedAt: null,
      },
    });

    if (duplicate) {
      throw new ConflictException('Bảo hành đã tồn tại');
    }

    const updated = await this.prismaService.warrantyPeriod.update({
      where: { id },
      data: request,
    });

    return plainToInstance(ResponseWarrantyPeriodDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prismaService.warrantyPeriod.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Xóa thành công' };
  }
}
