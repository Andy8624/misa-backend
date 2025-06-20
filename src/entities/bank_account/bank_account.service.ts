import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseBankAccountDto } from './dto/response-bank_account.dto';

@Injectable()
export class BankAccountService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBankAccountDto: CreateBankAccountDto) {
    // Create a new bank account
    const bankAccount = await this.prismaService.bankAccount.create({
      data: createBankAccountDto,
      include: {
        Bank: true,
        Partner: true,
      },
    });

    return plainToInstance(ResponseBankAccountDto, bankAccount, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const bankAccounts = await this.prismaService.bankAccount.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Bank: true,
        Partner: true,
      },
    });

    return plainToInstance(ResponseBankAccountDto, bankAccounts, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const bankAccount = await this.prismaService.bankAccount.findUnique({
      where: { id },
      include: {
        Bank: true,
        Partner: true,
      },
    });

    if (!bankAccount || bankAccount.deletedAt) {
      throw new NotFoundException('Không tìm thấy tài khoản ngân hàng');
    }

    return plainToInstance(ResponseBankAccountDto, bankAccount, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateBankAccountDto: UpdateBankAccountDto) {
    // Check if the bank account exists
    await this.findOne(id);

    // Update the bank account
    const updatedBankAccount = await this.prismaService.bankAccount.update({
      where: { id },
      data: updateBankAccountDto,
      include: {
        Bank: true,
        Partner: true,
      },
    });

    return plainToInstance(ResponseBankAccountDto, updatedBankAccount, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the bank account exists
    await this.findOne(id);

    // Soft delete the bank account
    await this.prismaService.bankAccount.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa tài khoản ngân hàng thành công' };
  }
}
