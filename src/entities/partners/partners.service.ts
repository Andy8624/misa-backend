import { CustomerService } from '../customer/customer.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponsePartnerDto } from './dto/response-partner-dto';
import { Prisma } from 'generated/prisma';
import {
  PartnerFilterType,
  PartnerPaginationResponseType,
} from 'src/interfaces/partner.interface';

@Injectable()
export class PartnersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly customerService: CustomerService,
  ) {}

  async create(createPartnerDto: CreatePartnerDto) {
    await this.customerService.findOne(createPartnerDto.customerId);

    const newPartner = await this.prismaService.partner.create({
      data: createPartnerDto,
    });

    return plainToInstance(ResponsePartnerDto, newPartner, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: PartnerFilterType,
  ): Promise<PartnerPaginationResponseType> {
    const pageSize = Number(filters.pageSize) || 20;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';
    const skip = page > 1 ? (page - 1) * pageSize : 0;

    const condition: Prisma.PartnerWhereInput = {
      OR: [
        {
          fullName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          taxCode: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
      deletedAt: null,
    };

    const [partners, total] = await Promise.all([
      this.prismaService.partner.findMany({
        where: condition,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prismaService.partner.count({ where: condition }),
    ]);
    return {
      data: plainToInstance(ResponsePartnerDto, partners, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string) {
    const partner = await this.prismaService.partner.findUnique({
      where: { id },
    });

    if (!partner || partner.deletedAt) {
      throw new NotFoundException('Không tìm thấy đối tác');
    }

    return plainToInstance(ResponsePartnerDto, partner, {
      excludeExtraneousValues: true,
    });
  }

  update(id: number, updatePartnerDto: UpdatePartnerDto) {
    return `This action updates a #${id} partner`;
  }

  remove(id: number) {
    return `This action removes a #${id} partner`;
  }
}
