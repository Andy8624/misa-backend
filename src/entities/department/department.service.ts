import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseDepartmentDto } from './dto/response-department.dto';

@Injectable()
export class DepartmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    // Create a new department
    const department = await this.prismaService.department.create({
      data: createDepartmentDto,
      include: {
        Company: true,
      },
    });

    return plainToInstance(ResponseDepartmentDto, department, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const departments = await this.prismaService.department.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Company: true,
      },
    });

    return plainToInstance(ResponseDepartmentDto, departments, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const department = await this.prismaService.department.findUnique({
      where: { id },
      include: {
        Company: true,
      },
    });

    if (!department || department.deletedAt) {
      throw new NotFoundException('Department not found');
    }

    return plainToInstance(ResponseDepartmentDto, department, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    // Check if the department exists
    await this.findOne(id);

    // Update the department
    const updatedDepartment = await this.prismaService.department.update({
      where: { id },
      data: updateDepartmentDto,
      include: {
        Company: true,
      },
    });

    return plainToInstance(ResponseDepartmentDto, updatedDepartment, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the department exists
    await this.findOne(id);

    // Soft delete the department
    await this.prismaService.department.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa đơn vị hành chính thành công' };
  }
}
