import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCircularDto } from './dto/create-circular.dto';
import { UpdateCircularDto } from './dto/update-circular.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseCircularDto } from './dto/response-circular.dto';

@Injectable()
export class CircularService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCircularDto: CreateCircularDto) {
    const circular = await this.prismaService.circular.create({
      data: createCircularDto,
    });

    return plainToInstance(ResponseCircularDto, circular, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const circulars = await this.prismaService.circular.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return plainToInstance(ResponseCircularDto, circulars, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const circular = await this.prismaService.circular.findUnique({
      where: { id },
    });

    if (!circular || circular.deletedAt) {
      throw new NotFoundException('Circular not found');
    }

    return plainToInstance(ResponseCircularDto, circular, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateCircularDto: UpdateCircularDto) {
    await this.findOne(id);

    const updatedCircular = await this.prismaService.circular.update({
      where: { id },
      data: updateCircularDto,
    });

    return plainToInstance(ResponseCircularDto, updatedCircular, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.circular.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa bản ghi thông tư thành công' };
  }
}
