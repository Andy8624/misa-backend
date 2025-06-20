import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseBankDto } from './dto/response-bank.dto';

@Injectable()
export class BankService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBankDto: CreateBankDto) {
    // Create a new bank
    const bank = await this.prismaService.bank.create({
      data: createBankDto,
    });

    return plainToInstance(ResponseBankDto, bank, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const banks = await this.prismaService.bank.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return plainToInstance(ResponseBankDto, banks, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const bank = await this.prismaService.bank.findUnique({
      where: { id },
    });

    if (!bank || bank.deletedAt) {
      throw new NotFoundException('Không tìm thấy ngân hàng');
    }

    return plainToInstance(ResponseBankDto, bank, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateBankDto: UpdateBankDto) {
    // Check if the bank exists
    await this.findOne(id);

    // Update the bank
    const updatedBank = await this.prismaService.bank.update({
      where: { id },
      data: updateBankDto,
    });

    return plainToInstance(ResponseBankDto, updatedBank, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the bank exists
    await this.findOne(id);

    // Soft delete the bank
    await this.prismaService.bank.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa ngân hàng thành công' };
  }
}
