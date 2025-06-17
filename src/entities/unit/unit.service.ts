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
          'Tên đơn vị tính đã tồn tại trong công ty này',
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
        throw new ConflictException('Công ty không tồn tại');
      }

      if (error.code === 'P2002') {
        throw new ConflictException('Đơn vị tính đã tồn tại');
      }

      if (
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new Error('Tạo đơn vị tính thất bại');
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
        // Chỉ thêm customerId khi có giá trị
        ...(customerId ? [{ customerId }] : []),

        // Chỉ thêm status khi có giá trị
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
      throw new NotFoundException('Không tìm thấy đơn vị tính');
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
            'Tên đơn vị tính đã tồn tại trong công ty này',
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
        throw new ConflictException('Công ty không tồn tại');
      }

      if (
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      console.error('Update unit error:', error);
      throw new Error('Cập nhật đơn vị tính thất bại');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prismaService.unit.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Xóa thành công' };
  }
}
