import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupOfPurchaseGoodDto } from './dto/create-group_of_purchase_good.dto';
import { UpdateGroupOfPurchaseGoodDto } from './dto/update-group_of_purchase_good.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseGroupOfPurchaseGoodDto } from './dto/response-group_of_purchase_good.dto';

@Injectable()
export class GroupOfPurchaseGoodService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createGroupOfPurchaseGoodDto: CreateGroupOfPurchaseGoodDto) {
    // Create a new group of purchase good
    const groupOfPurchaseGood =
      await this.prismaService.groupOfPurchasedGood.create({
        data: createGroupOfPurchaseGoodDto,
      });

    return plainToInstance(
      ResponseGroupOfPurchaseGoodDto,
      groupOfPurchaseGood,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findAll() {
    const groupOfPurchaseGoods =
      await this.prismaService.groupOfPurchasedGood.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

    return plainToInstance(
      ResponseGroupOfPurchaseGoodDto,
      groupOfPurchaseGoods,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findOne(id: string) {
    const groupOfPurchaseGood =
      await this.prismaService.groupOfPurchasedGood.findUnique({
        where: { id },
      });

    if (!groupOfPurchaseGood || groupOfPurchaseGood.deletedAt) {
      throw new NotFoundException('Không tìm thấy nhóm hàng mua');
    }

    return plainToInstance(
      ResponseGroupOfPurchaseGoodDto,
      groupOfPurchaseGood,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async update(
    id: string,
    updateGroupOfPurchaseGoodDto: UpdateGroupOfPurchaseGoodDto,
  ) {
    // Check if the group of purchase good exists
    await this.findOne(id);

    // Update the group of purchase good
    const updatedGroupOfPurchaseGood =
      await this.prismaService.groupOfPurchasedGood.update({
        where: { id },
        data: updateGroupOfPurchaseGoodDto,
      });

    return plainToInstance(
      ResponseGroupOfPurchaseGoodDto,
      updatedGroupOfPurchaseGood,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async remove(id: string): Promise<{ message: string }> {
    // Check if the group of purchase good exists
    await this.findOne(id);

    // Soft delete the group of purchase good
    await this.prismaService.groupOfPurchasedGood.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa nhóm hàng mua thành công' };
  }
}
