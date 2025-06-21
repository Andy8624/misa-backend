import { Prisma } from 'generated/prisma';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInventoryOutDto } from './dto/create-inventory_out.dto';
import { UpdateInventoryOutDto } from './dto/update-inventory_out.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseInventoryOutDto } from './dto/response-inventory_out.dto';
import {
  InventoryOutFilterType,
  InventoryOutPaginationResponseType,
} from 'src/interfaces/inventory_out.interface';

@Injectable()
export class InventoryOutService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createInventoryOutDto: CreateInventoryOutDto) {
    // Check for duplicate voucherNumber within the same companyId
    const existingVoucher = await this.prismaService.inventoryOut.findFirst({
      where: {
        voucherNumber: createInventoryOutDto.voucherNumber,
        companyId: createInventoryOutDto.companyId,
        deletedAt: null,
      },
    });

    if (existingVoucher) {
      throw new ConflictException(
        'Voucher number already exists in the system',
      );
    }

    // Create new inventory out receipt
    const inventoryOut = await this.prismaService.inventoryOut.create({
      data: createInventoryOutDto,
      include: {
        storePerson: true,
        client: true,
        object: true,
      },
    });

    return plainToInstance(ResponseInventoryOutDto, inventoryOut, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: InventoryOutFilterType,
  ): Promise<InventoryOutPaginationResponseType> {
    const pageSize = Number(filters.pageSize) || 20;
    const page = Number(filters.page) || 1;
    const search = filters.search || '';

    const skip = page > 1 ? (page - 1) * pageSize : 0;

    const condition: Prisma.InventoryOutWhereInput = {
      AND: [
        ...(search
          ? [
              {
                OR: [
                  {
                    inventoryOutVoucherType: {
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
                    particular: {
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

    const [inventoryOuts, total] = await Promise.all([
      this.prismaService.inventoryOut.findMany({
        where: condition,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          storePerson: true,
          client: true,
          object: true,
          attached: true,
          InventoryOutItem: {
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

      this.prismaService.inventoryOut.count({ where: condition }),
    ]);

    return {
      data: plainToInstance(ResponseInventoryOutDto, inventoryOuts, {
        excludeExtraneousValues: true,
      }),
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string) {
    const inventoryOut = await this.prismaService.inventoryOut.findUnique({
      where: { id },
      include: {
        storePerson: true,
        client: true,
        object: true,
        attached: true,
        InventoryOutItem: {
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

    if (!inventoryOut || inventoryOut.deletedAt) {
      throw new NotFoundException('Inventory out receipt not found');
    }

    return plainToInstance(ResponseInventoryOutDto, inventoryOut, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateInventoryOutDto: UpdateInventoryOutDto) {
    // Check if inventory out receipt exists
    const existingInventoryOut = await this.findOne(id);

    // Check for duplicate voucherNumber within the same companyId if changed
    if (
      updateInventoryOutDto.voucherNumber &&
      updateInventoryOutDto.voucherNumber !== existingInventoryOut.voucherNumber
    ) {
      const existingVoucher = await this.prismaService.inventoryOut.findFirst({
        where: {
          voucherNumber: updateInventoryOutDto.voucherNumber,
          companyId: existingInventoryOut.companyId,
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

    const updated = await this.prismaService.inventoryOut.update({
      where: { id },
      data: updateInventoryOutDto,
      include: {
        storePerson: true,
        client: true,
        object: true,
        attached: true,
        InventoryOutItem: {
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

    return plainToInstance(ResponseInventoryOutDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if inventory out receipt exists
    await this.findOne(id);

    // Soft delete inventory out receipt
    await this.prismaService.inventoryOut.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Inventory out receipt deleted successfully' };
  }
}
