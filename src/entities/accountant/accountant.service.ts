import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UpdateAccountantDto } from './dto/update-accountant.dto';

import {
  AccountantFilterType,
  AccountantPaginationResponseType,
  ResponseAccountantDto,
} from './dto/response-accountant.dto';
import { plainToInstance } from 'class-transformer';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AccountantService {
  constructor(private readonly prismaService: PrismaService) {}

  private async getAccountantOrThrow(id: string) {
    const accountant = await this.prismaService.accountant.findUnique({
      where: { id },
    });

    if (!accountant || accountant.deletedAt !== null) {
      throw new HttpException(
        { message: 'Accountant not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    return accountant;
  }

  public async getAccountantByEmail(email: string) {
    const accountant = await this.prismaService.accountant.findUnique({
      where: { email },
    });

    if (!accountant || accountant.deletedAt !== null) {
      return null;
    }

    return accountant;
  }

  async findAll(
    filters: AccountantFilterType,
  ): Promise<AccountantPaginationResponseType> {
    const pageSize = Number(filters.pageSize) || 20;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';

    const skip = page > 1 ? (page - 1) * pageSize : 0;

    const condition: Prisma.AccountantWhereInput = {
      AND: [
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
                    email: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                ],
              },
            ]
          : []),
        { deletedAt: null },
      ],
    };

    // Concurrent query
    const [accountants, total] = await Promise.all([
      this.prismaService.accountant.findMany({
        take: pageSize,
        skip,
        where: condition,
        orderBy: { createdAt: 'desc' },
      }),
      this.prismaService.accountant.count({
        where: condition,
      }),
    ]);

    return {
      data: plainToInstance(ResponseAccountantDto, accountants, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string): Promise<ResponseAccountantDto> {
    const accountant = await this.getAccountantOrThrow(id);
    return plainToInstance(ResponseAccountantDto, accountant, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: string,
    dto: UpdateAccountantDto,
  ): Promise<ResponseAccountantDto> {
    // Check if user exists
    const existing = await this.getAccountantOrThrow(id);

    // Check if the new email (if provided) already exists
    if (dto.email && dto.email !== existing.email) {
      const exists = await this.prismaService.accountant.findFirst({
        where: { email: dto.email, id: { not: id } },
      });

      if (exists) {
        throw new BadRequestException('Email already exists');
      }
    }

    // Filter out fields not in DTO (preventing ID and password updates)
    const cleaned = plainToInstance(UpdateAccountantDto, dto, {
      excludeExtraneousValues: true,
    });

    // console.log(cleaned);
    const updated = await this.prismaService.accountant.update({
      where: { id },
      data: cleaned,
    });

    return plainToInstance(ResponseAccountantDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.getAccountantOrThrow(id);
    await this.prismaService.accountant.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Successfully deleted' };
  }
}
