import { CustomerService } from '../customer/customer.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Prisma } from 'generated/prisma';
import {
  PartnerFilterType,
  PartnerPaginationResponseType,
} from 'src/interfaces/partner.interface';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { ResponsePartnerDto } from './dto/response-partner-dto';

@Injectable()
export class PartnersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly customerService: CustomerService,
  ) {}

  async create(createPartnerDto: CreatePartnerDto) {
    console.log(createPartnerDto);
    await this.customerService.findOne(createPartnerDto.customerId);
    const existsPartnerCode = await this.prismaService.partner.findFirst({
      where: {
        partnerCode: createPartnerDto.partnerCode,
        customerId: createPartnerDto.customerId,
      },
    });
    if (existsPartnerCode) {
      if (createPartnerDto.partnerType === 'client') {
        throw new ConflictException('Customer code already exists');
      }
      throw new ConflictException('Supplier code already exists');
    }

    const exists = await this.prismaService.partner.findFirst({
      where: {
        taxCode: createPartnerDto.taxCode,
        partnerType: createPartnerDto.partnerType,
        customerId: createPartnerDto.customerId,
      },
    });

    if (exists) {
      if (createPartnerDto.partnerType === 'client') {
        throw new ConflictException(
          'Customer with this tax code already exists',
        );
      }
      throw new ConflictException('Supplier with this tax code already exists');
    }

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
    const partnerType = filters.partnerType || '';
    const customerId = filters.customerId || '';
    const skip = page > 1 ? (page - 1) * pageSize : 0;

    const condition: Prisma.PartnerWhereInput = {
      AND: [
        // Search condition
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
                    taxCode: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                ],
              },
            ]
          : []),

        ...(partnerType ? [{ partnerType }] : []),

        ...(customerId ? [{ customerId }] : []),

        { deletedAt: null },
      ],
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
      throw new NotFoundException('Partner not found');
    }

    return plainToInstance(ResponsePartnerDto, partner, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    const existPartner = await this.findOne(id);

    if (
      (updatePartnerDto.taxCode &&
        updatePartnerDto.taxCode !== existPartner.taxCode) ||
      (updatePartnerDto.partnerType &&
        updatePartnerDto.partnerType !== existPartner.partnerType)
    ) {
      const exists = await this.prismaService.partner.findFirst({
        where: {
          taxCode: updatePartnerDto.taxCode || existPartner.taxCode,
          partnerType: updatePartnerDto.partnerType || existPartner.partnerType,
          customerId: existPartner.customerId,
          id: { not: id },
          deletedAt: null,
        },
      });

      if (exists) {
        const type = updatePartnerDto.partnerType || existPartner.partnerType;
        if (type === 'client') {
          throw new ConflictException(
            'Customer with this tax code already exists',
          );
        }
        throw new ConflictException(
          'Supplier with this tax code already exists',
        );
      }
    }

    const updated = await this.prismaService.partner.update({
      where: { id },
      data: updatePartnerDto,
    });

    return plainToInstance(ResponsePartnerDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prismaService.partner.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { message: 'Successfully deleted' };
  }
}
