import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseObjectDto } from './dto/response-object.dto';

@Injectable()
export class ObjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createObjectDto: CreateObjectDto) {
    const object = await this.prismaService.object.create({
      data: createObjectDto,
      include: {
        Company: true,
      },
    });

    return plainToInstance(ResponseObjectDto, object, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const objects = await this.prismaService.object.findMany({
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

    return plainToInstance(ResponseObjectDto, objects, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const object = await this.prismaService.object.findUnique({
      where: { id },
      include: {
        Company: true,
      },
    });

    if (!object || object.deletedAt) {
      throw new NotFoundException('Object not found');
    }

    return plainToInstance(ResponseObjectDto, object, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateObjectDto: UpdateObjectDto) {
    await this.findOne(id);

    const updatedObject = await this.prismaService.object.update({
      where: { id },
      data: updateObjectDto,
      include: {
        Company: true,
      },
    });

    return plainToInstance(ResponseObjectDto, updatedObject, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.object.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa đối tượng thành công' };
  }
}
