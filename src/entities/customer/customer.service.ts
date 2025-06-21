import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from '../../prisma.service';
import { plainToInstance } from 'class-transformer';
import {
  CustomerFilterType,
  CustomerPaginationResponseType,
  ResponseCustomerDto,
} from './dto/response-customer.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateCustomerDto) {
    const existingCustomer = await this.prismaService.customer.findFirst({
      where: {
        AND: [{ taxCode: dto.taxCode, accountantId: dto.accountantId }],
      },
    });

    if (existingCustomer) {
      throw new ConflictException('Tax code already exists');
    }

    const customer = await this.prismaService.customer.create({
      data: dto,
    });

    return plainToInstance(ResponseCustomerDto, customer, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: CustomerFilterType,
  ): Promise<CustomerPaginationResponseType> {
    const pageSize = Number(filters.pageSize) || 20;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';
    const skip = page > 1 ? (page - 1) * pageSize : 0;

    const condition: Prisma.CustomerWhereInput = {
      AND: [
        ...(search
          ? [
              {
                OR: [
                  {
                    customerName: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    taxCode: {
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

    const [customers, total] = await Promise.all([
      this.prismaService.customer.findMany({
        where: condition,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prismaService.customer.count({ where: condition }),
    ]);

    return {
      data: plainToInstance(ResponseCustomerDto, customers, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string) {
    const customer = await this.prismaService.customer.findUnique({
      where: { id },
    });

    if (!customer || customer.deletedAt) {
      throw new NotFoundException('Customer (Company) not found');
    }

    return plainToInstance(ResponseCustomerDto, customer, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, dto: UpdateCustomerDto) {
    const existing = await this.findOne(id);

    if (dto.taxCode && dto.taxCode !== existing.taxCode) {
      const exists = await this.prismaService.customer.findFirst({
        where: { taxCode: dto.taxCode, id: { not: id } },
      });

      if (exists) {
        throw new ConflictException('TaxCode already exists');
      }
    }

    const updated = await this.prismaService.customer.update({
      where: { id },
      data: dto,
    });

    return plainToInstance(ResponseCustomerDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prismaService.customer.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Successfully deleted' };
  }
}
