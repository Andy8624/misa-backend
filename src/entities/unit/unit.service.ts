import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { PrismaService } from '../../prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseUnitDto } from './dto/response-unit.dto';
import { Prisma } from 'generated/prisma';
import {
  UnitFilterType,
  UnitPaginationResponseType,
} from 'src/interfaces/unit.interface';

@Injectable()
export class UnitService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateUnitDto) {
    try {
      const existingUnit = await this.prismaService.unit.findFirst({
        where: {
          name: dto.name,
          customerId: dto.customerId,
          deletedAt: null,
        },
      });

      if (existingUnit) {
        throw new ConflictException(
          'Unit name already exists for this company',
        );
      }

      const unit = await this.prismaService.unit.create({
        data: dto,
      });

      return plainToInstance(ResponseUnitDto, unit, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      console.log(error);
      if (error.code === 'P2003') {
        throw new ConflictException('Company not found');
      }

      if (error.code === 'P2002') {
        // This specific Prisma error typically indicates a unique constraint violation.
        // In this context, it's likely for a unique 'name' field if one exists without `deletedAt: null`.
        // The more specific check for `existingUnit` handles the soft-delete aspect.
        // Keeping this as a fallback or if there's another unique constraint.
        throw new ConflictException('Unit already exists');
      }

      if (
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new Error('Failed to create unit');
    }
  }

  async findAll(filters: UnitFilterType): Promise<UnitPaginationResponseType> {
    const pageSize = Number(filters.pageSize) || 20;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';
    const customerId = filters.customerId || '';
    const status = filters.status || '';
    const skip = page > 1 ? (page - 1) * pageSize : 0;

    const condition: Prisma.UnitWhereInput = {
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
                    description: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                ],
              },
            ]
          : []),
        // Only add customerId when it has a value
        ...(customerId ? [{ customerId }] : []),

        // Only add status when it has a value
        ...(status ? [{ status }] : []),

        { deletedAt: null },
      ],
    };

    const [units, total] = await Promise.all([
      this.prismaService.unit.findMany({
        where: condition,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prismaService.unit.count({ where: condition }),
    ]);

    return {
      data: plainToInstance(ResponseUnitDto, units, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string) {
    const unit = await this.prismaService.unit.findUnique({
      where: { id },
    });

    if (!unit || unit.deletedAt) {
      throw new NotFoundException('Unit not found');
    }

    return plainToInstance(ResponseUnitDto, unit, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, dto: UpdateUnitDto) {
    try {
      const existing = await this.findOne(id);

      if (dto.name && dto.name !== existing.name) {
        const exists = await this.prismaService.unit.findFirst({
          where: {
            name: dto.name,
            customerId: existing.customerId,
            id: { not: id },
            deletedAt: null,
          },
        });

        if (exists) {
          throw new ConflictException(
            'Unit name already exists for this company',
          );
        }
      }

      const updated = await this.prismaService.unit.update({
        where: { id },
        data: dto,
      });

      return plainToInstance(ResponseUnitDto, updated, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new ConflictException('Company not found');
      }

      if (
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      console.error('Update unit error:', error);
      throw new Error('Failed to update unit');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prismaService.unit.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Successfully deleted' };
  }
}
