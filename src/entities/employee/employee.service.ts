import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ResponseEmployeeDto } from './dto/response-employee.dto';
import { plainToInstance } from 'class-transformer';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';
import {
  EmployeeFilterType,
  EmployeePaginationResponseType,
} from 'src/interfaces/employee.interface';

@Injectable()
export class EmployeeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const existingEmployee = await this.prismaService.employee.findFirst({
      where: {
        AND: [
          {
            idCardNumber: createEmployeeDto.idCardNumber,
            customerId: createEmployeeDto.customerId,
          },
        ],
      },
    });
    if (existingEmployee) {
      throw new ConflictException('Nhân viên đã tồn tại');
    }

    const employee = await this.prismaService.employee.create({
      data: createEmployeeDto,
    });

    return plainToInstance(ResponseEmployeeDto, employee, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: EmployeeFilterType,
  ): Promise<EmployeePaginationResponseType> {
    const pageSize = Number(filters.pageSize) || 20;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';
    const customerId = filters.customerId || '';

    const skip = page > 1 ? (page - 1) * pageSize : 0;
    const condition: Prisma.EmployeeWhereInput = {
      AND: [
        // Search conditions
        ...(search
          ? [
              {
                OR: [
                  {
                    fullName: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    employeeCode: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                ],
              },
            ]
          : []),

        // Customer filter
        ...(customerId ? [{ customerId }] : []),

        { deletedAt: null },
      ],
    };

    const [employees, total] = await Promise.all([
      this.prismaService.employee.findMany({
        where: condition,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prismaService.employee.count({ where: condition }),
    ]);

    return {
      data: plainToInstance(ResponseEmployeeDto, employees, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string) {
    const employee = await this.prismaService.employee.findUnique({
      where: { id },
    });

    if (!employee || employee.deletedAt) {
      throw new NotFoundException('Không tìm thấy nhân viên');
    }

    return plainToInstance(ResponseEmployeeDto, employee, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const existing = await this.findOne(id);
    if (
      updateEmployeeDto.idCardNumber &&
      updateEmployeeDto.idCardNumber !== existing.idCardNumber
    ) {
      const exists = await this.prismaService.employee.findFirst({
        where: {
          idCardNumber: updateEmployeeDto.idCardNumber,
          customerId: updateEmployeeDto.customerId,
          id: { not: id },
        },
      });

      if (exists) {
        throw new ConflictException('Mã số định danh (CCCD) đã tồn tại');
      }
    }

    const updated = await this.prismaService.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });

    return plainToInstance(ResponseEmployeeDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prismaService.employee.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Xóa thành công' };
  }
}
