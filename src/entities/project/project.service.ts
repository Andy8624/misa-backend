import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseProjectDto } from './dto/response-project.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = await this.prismaService.project.create({
      data: createProjectDto,
      include: {
        Customer: true,
        Company: true,
      },
    });

    return plainToInstance(ResponseProjectDto, project, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const projects = await this.prismaService.project.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Customer: true,
        Company: true,
      },
    });

    return plainToInstance(ResponseProjectDto, projects, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const project = await this.prismaService.project.findUnique({
      where: { id },
      include: {
        Customer: true,
        Company: true,
      },
    });

    if (!project || project.deletedAt) {
      throw new NotFoundException('Project not found');
    }

    return plainToInstance(ResponseProjectDto, project, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    await this.findOne(id);

    const updatedProject = await this.prismaService.project.update({
      where: { id },
      data: updateProjectDto,
      include: {
        Customer: true,
        Company: true,
      },
    });

    return plainToInstance(ResponseProjectDto, updatedProject, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.project.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa dự án thành công' };
  }
}
