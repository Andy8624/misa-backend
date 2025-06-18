import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccountMainSystemDto } from './dto/create-account_main_system.dto';
import { UpdateAccountMainSystemDto } from './dto/update-account_main_system.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAccountMainSystemDto } from './dto/response-account_main_system.dto';
import {
  AccountMainSystemFilterType,
  AccountMainSystemPaginationResponseType,
} from 'src/interfaces/account_main_systerm.interface';
import { Prisma } from 'generated/prisma';

@Injectable()
export class AccountMainSystemService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(request: CreateAccountMainSystemDto) {
    const existing = await this.prismaService.accountMainSystem.findFirst({
      where: {
        AND: [
          {
            accountCode: request.accountCode,
            customerId: request.customerId,
          },
        ],
      },
    });

    if (existing) {
      throw new ConflictException('Tài khoản đã tồn tại');
    }

    const newAccount = await this.prismaService.accountMainSystem.create({
      data: request,
    });

    return plainToInstance(ResponseAccountMainSystemDto, newAccount, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: AccountMainSystemFilterType,
  ): Promise<AccountMainSystemPaginationResponseType> {
    const pageSize = Number(filters.pageSize) || 20;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';
    const customerId = filters.customerId || '';

    const skip = page > 1 ? (page - 1) * pageSize : 0;
    const condition: Prisma.AccountMainSystemWhereInput = {
      AND: [
        ...(search
          ? [
              {
                OR: [
                  {
                    accountCode: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    accountName: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    accountType: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    engAccountName: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                ],
              },
            ]
          : []),

        ...(customerId ? [{ customerId }] : []),

        { deletedAt: null },
      ],
    };

    const [response, total] = await Promise.all([
      this.prismaService.accountMainSystem.findMany({
        where: condition,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prismaService.accountMainSystem.count({ where: condition }),
    ]);

    return {
      data: plainToInstance(ResponseAccountMainSystemDto, response, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string) {
    const account = await this.prismaService.accountMainSystem.findUnique({
      where: { id },
    });

    if (!account || account.deletedAt) {
      throw new NotFoundException('Không tìm thấy tài khoản');
    }

    return plainToInstance(ResponseAccountMainSystemDto, account, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, request: UpdateAccountMainSystemDto) {
    await this.findOne(id);
    const duplicate = await this.prismaService.accountMainSystem.findFirst({
      where: {
        accountCode: request.accountCode,
        customerId: request.customerId,
        id: { not: id },
        deletedAt: null,
      },
    });

    if (duplicate) {
      throw new ConflictException('Mã tài khoản này đã tồn tại');
    }

    const updatedEntity = await this.prismaService.accountMainSystem.update({
      where: { id },
      data: request,
    });

    return plainToInstance(ResponseAccountMainSystemDto, updatedEntity, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prismaService.accountMainSystem.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Xóa thành công' };
  }
}
