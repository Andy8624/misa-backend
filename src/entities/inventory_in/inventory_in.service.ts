import { Prisma } from 'generated/prisma';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInventoryInDto } from './dto/create-inventory_in.dto';
import { UpdateInventoryInDto } from './dto/update-inventory_in.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseInventoryInDto } from './dto/response-inventory_in.dto';
import {
  InventoryInFilterType,
  InventoryInPaginationResponseType,
} from 'src/interfaces/inventory_in.interface';

@Injectable()
export class InventoryInService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createInventoryInDto: CreateInventoryInDto) {
    // Check for duplicate voucherNumber within the same customerId
    const existingVoucher = await this.prismaService.inventoryIn.findFirst({
      where: {
        voucherNumber: createInventoryInDto.voucherNumber,
        companyId: createInventoryInDto.companyId,
        deletedAt: null,
      },
    });

    if (existingVoucher) {
      throw new ConflictException(
        'Voucher number already exists in the system',
      );
    }

    // Create new inventory receipt
    const inventoryIn = await this.prismaService.inventoryIn.create({
      data: createInventoryInDto,
      include: {
        storePerson: true,
        client: true,
        object: true,
      },
    });

    return plainToInstance(ResponseInventoryInDto, inventoryIn, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: InventoryInFilterType,
  ): Promise<InventoryInPaginationResponseType> {
    const pageSize = Number(filters.pageSize) || 20;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';
    const companyId = filters.companyId || '';

    const skip = page > 1 ? (page - 1) * pageSize : 0;

    const condition: Prisma.InventoryInWhereInput = {
      AND: [
        ...(search
          ? [
              {
                OR: [
                  {
                    inventoryInVoucherType: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    voucherNumber: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    description: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                ],
              },
            ]
          : []),

        ...(companyId ? [{ companyId }] : []),

        { deletedAt: null },
      ],
    };

    const [inventoryIns, total] = await Promise.all([
      this.prismaService.inventoryIn.findMany({
        where: condition,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          storePerson: true,
          client: true,
          object: true,

          InventoryInItem: {
            include: {
              item: true,
              unit: true,
              warehouse: true,
              creditAccount: true,
              debitAccount: true,
            },
          },
        },
      }),

      this.prismaService.inventoryIn.count({ where: condition }),
    ]);

    return {
      data: plainToInstance(ResponseInventoryInDto, inventoryIns, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string) {
    const inventoryIn = await this.prismaService.inventoryIn.findUnique({
      where: { id },
      include: {
        storePerson: true,
        client: true,
        object: true,

        InventoryInItem: {
          include: {
            item: true,
            unit: true,
            warehouse: true,
            creditAccount: true,
            debitAccount: true,
          },
        },
      },
    });

    if (!inventoryIn || inventoryIn.deletedAt) {
      throw new NotFoundException('Inventory receipt not found');
    }

    return plainToInstance(ResponseInventoryInDto, inventoryIn, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateInventoryInDto: UpdateInventoryInDto) {
    // Check if inventory receipt exists
    const existingInventoryIn = await this.findOne(id);

    // Check for duplicate voucherNumber within the same customerId if changed
    if (
      updateInventoryInDto.voucherNumber &&
      updateInventoryInDto.voucherNumber !== existingInventoryIn.voucherNumber
    ) {
      const existingVoucher = await this.prismaService.inventoryIn.findFirst({
        where: {
          voucherNumber: updateInventoryInDto.voucherNumber,
          companyId: existingInventoryIn.companyId,
          id: { not: id }, // Exclude the current record itself
          deletedAt: null,
        },
      });

      if (existingVoucher) {
        throw new ConflictException(
          'Voucher number already exists in the system',
        );
      }
    }

    const updated = await this.prismaService.inventoryIn.update({
      where: { id },
      data: updateInventoryInDto,
      include: {
        storePerson: true,
        client: true,
        object: true,

        InventoryInItem: {
          include: {
            item: true,
            unit: true,
            warehouse: true,
            creditAccount: true,
            debitAccount: true,
          },
        },
      },
    });

    return plainToInstance(ResponseInventoryInDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if inventory receipt exists
    await this.findOne(id);

    // Soft delete inventory receipt
    await this.prismaService.inventoryIn.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Inventory receipt deleted successfully' };
  }
}
