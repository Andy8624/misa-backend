import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChartOfAccountDto } from './dto/create-chart_of_account.dto';
import { UpdateChartOfAccountDto } from './dto/update-chart_of_account.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseChartOfAccountDto } from './dto/response-chart_of_account.dto';
import {
  ChartOfAccountFilterType,
  ChartOfAccountPaginationResponseType,
} from 'src/interfaces/account_main_systerm.interface';
import { Prisma } from 'generated/prisma';

@Injectable()
export class ChartOfAccountService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(request: CreateChartOfAccountDto) {
    const existing = await this.prismaService.chartOfAccount.findFirst({
      where: {
        AND: [
          {
            accountNumber: request.accountNumber,
            customerId: request.customerId,
          },
        ],
      },
    });

    if (existing) {
      throw new ConflictException('Tài khoản đã tồn tại');
    }

    const newAccount = await this.prismaService.chartOfAccount.create({
      data: request,
    });

    return plainToInstance(ResponseChartOfAccountDto, newAccount, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: ChartOfAccountFilterType,
  ): Promise<ChartOfAccountPaginationResponseType> {
    const pageSize = Number(filters.pageSize) || 20;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';
    const customerId = filters.customerId || '';

    const skip = page > 1 ? (page - 1) * pageSize : 0;
    const condition: Prisma.ChartOfAccountWhereInput = {
      AND: [
        ...(search
          ? [
              {
                OR: [
                  {
                    accountNumber: {
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
                    englishName: {
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
      this.prismaService.chartOfAccount.findMany({
        where: condition,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prismaService.chartOfAccount.count({ where: condition }),
    ]);

    return {
      data: plainToInstance(ResponseChartOfAccountDto, response, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string) {
    const account = await this.prismaService.chartOfAccount.findUnique({
      where: { id },
    });

    if (!account || account.deletedAt) {
      throw new NotFoundException('Không tìm thấy tài khoản');
    }

    return plainToInstance(ResponseChartOfAccountDto, account, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, request: UpdateChartOfAccountDto) {
    await this.findOne(id);
    const duplicate = await this.prismaService.chartOfAccount.findFirst({
      where: {
        accountNumber: request.accountNumber,
        customerId: request.customerId,
        id: { not: id },
        deletedAt: null,
      },
    });

    if (duplicate) {
      throw new ConflictException('Mã tài khoản này đã tồn tại');
    }

    const updatedEntity = await this.prismaService.chartOfAccount.update({
      where: { id },
      data: request,
    });

    return plainToInstance(ResponseChartOfAccountDto, updatedEntity, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prismaService.chartOfAccount.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Xóa thành công' };
  }
}
