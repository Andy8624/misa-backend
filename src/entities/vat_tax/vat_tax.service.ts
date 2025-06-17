import { Prisma } from 'generated/prisma';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVatTaxDto } from './dto/create-vat_tax.dto';
import { UpdateVatTaxDto } from './dto/update-vat_tax.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseVatTaxDto } from './dto/response-vat_tax.dto';
import {
  VatTaxFilterType,
  VatTaxPaginationResponseType,
} from 'src/interfaces/vat_tax.interface';

@Injectable()
export class VatTaxService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVatTaxDto: CreateVatTaxDto) {
    const existingVatTax = await this.prismaService.vatTax.findFirst({
      where: {
        percent: createVatTaxDto.percent,
        customerId: createVatTaxDto.customerId,
        deletedAt: null,
      },
    });

    if (existingVatTax) {
      throw new ConflictException('Thuế vat đã tồn tại');
    }

    const vatTax = await this.prismaService.vatTax.create({
      data: createVatTaxDto,
    });

    return plainToInstance(ResponseVatTaxDto, vatTax, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: VatTaxFilterType,
  ): Promise<VatTaxPaginationResponseType> {
    const pageSize = Number(filters.pageSize) || 20;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';
    const customerId = filters.customerId || '';

    const skip = page > 1 ? (page - 1) * pageSize : 0;

    const condition: Prisma.VatTaxWhereInput = {
      AND: [
        ...(search
          ? [
              {
                OR: [
                  {
                    name: {
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

    const [vatTaxes, total] = await Promise.all([
      this.prismaService.vatTax.findMany({
        where: condition,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),

      this.prismaService.vatTax.count({ where: condition }),
    ]);

    return {
      data: plainToInstance(ResponseVatTaxDto, vatTaxes, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string) {
    const vatTax = await this.prismaService.vatTax.findUnique({
      where: { id },
    });

    if (!vatTax || vatTax.deletedAt) {
      throw new NotFoundException('Không tìm thấy thuế vat');
    }

    return plainToInstance(ResponseVatTaxDto, vatTax, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateVatTaxDto: UpdateVatTaxDto) {
    const existing = await this.findOne(id);

    if (
      updateVatTaxDto.percent &&
      updateVatTaxDto.percent !== existing.percent
    ) {
      const exists = await this.prismaService.vatTax.findFirst({
        where: {
          percent: updateVatTaxDto.percent,
          customerId: existing.customerId,
          id: { not: id },
          deletedAt: null,
        },
      });

      if (exists) {
        throw new ConflictException('Thuế VAT với tỷ lệ này đã tồn tại');
      }
    }

    const updated = await this.prismaService.vatTax.update({
      where: { id },
      data: updateVatTaxDto,
    });

    return plainToInstance(ResponseVatTaxDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prismaService.vatTax.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Xóa thành công' };
  }
}
