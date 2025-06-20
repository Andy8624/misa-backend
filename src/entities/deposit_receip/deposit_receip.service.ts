import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepositReceipDto } from './dto/create-deposit_receip.dto';
import { UpdateDepositReceipDto } from './dto/update-deposit_receip.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseDepositReceipDto } from './dto/response-deposit_receip.dto';

@Injectable()
export class DepositReceipService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDepositReceipDto: CreateDepositReceipDto) {
    // Create a new deposit receipt
    const depositReceip = await this.prismaService.depositReceip.create({
      data: createDepositReceipDto,
      include: {
        DebtCollector: true,
        Employee: true,
        Subject: true,
        Customer: true,
        Bank: true,
      },
    });

    return plainToInstance(ResponseDepositReceipDto, depositReceip, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const depositReceips = await this.prismaService.depositReceip.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        DebtCollector: true,
        Employee: true,
        Subject: true,
        Customer: true,
        Bank: true,
      },
    });

    return plainToInstance(ResponseDepositReceipDto, depositReceips, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const depositReceip = await this.prismaService.depositReceip.findUnique({
      where: { id },
      include: {
        DebtCollector: true,
        Employee: true,
        Subject: true,
        Customer: true,
        Bank: true,
      },
    });

    if (!depositReceip || depositReceip.deletedAt) {
      throw new NotFoundException('Không tìm thấy phiếu gửi tiền');
    }

    return plainToInstance(ResponseDepositReceipDto, depositReceip, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateDepositReceipDto: UpdateDepositReceipDto) {
    // Check if the deposit receipt exists
    await this.findOne(id);

    // Update the deposit receipt
    const updatedDepositReceip = await this.prismaService.depositReceip.update({
      where: { id },
      data: updateDepositReceipDto,
      include: {
        DebtCollector: true,
        Employee: true,
        Subject: true,
        Customer: true,
        Bank: true,
      },
    });

    return plainToInstance(ResponseDepositReceipDto, updatedDepositReceip, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the deposit receipt exists
    await this.findOne(id);

    // Soft delete the deposit receipt
    await this.prismaService.depositReceip.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa phiếu gửi tiền thành công' };
  }
}
