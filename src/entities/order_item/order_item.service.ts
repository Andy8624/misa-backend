import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseOrderItemDto } from './dto/response-order_item.dto';

@Injectable()
export class OrderItemService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    const orderItem = await this.prismaService.orderItem.create({
      data: createOrderItemDto,
      include: {
        Goods: true,
        DiscountAccount: true,
        ReceivableAccount: true,
        VatAccount: true,
        CreditAccount: true,
        DebitAccount: true,
        ReturnAccount: true,
        Quote: true,
        PurchaseOrder: true,
        SaleDiscountVoucher: true,
        SalesReturn: true,
      },
    });

    return plainToInstance(ResponseOrderItemDto, orderItem, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const orderItems = await this.prismaService.orderItem.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Goods: true,
        DiscountAccount: true,
        ReceivableAccount: true,
        VatAccount: true,
        CreditAccount: true,
        DebitAccount: true,
        ReturnAccount: true,
        Quote: true,
        PurchaseOrder: true,
        SaleDiscountVoucher: true,
        SalesReturn: true,
      },
    });

    return plainToInstance(ResponseOrderItemDto, orderItems, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const orderItem = await this.prismaService.orderItem.findUnique({
      where: { id },
      include: {
        Goods: true,
        DiscountAccount: true,
        ReceivableAccount: true,
        VatAccount: true,
        CreditAccount: true,
        DebitAccount: true,
        ReturnAccount: true,
        Quote: true,
        PurchaseOrder: true,
        SaleDiscountVoucher: true,
        SalesReturn: true,
      },
    });

    if (!orderItem || orderItem.deletedAt) {
      throw new NotFoundException('OrderItem not found');
    }

    return plainToInstance(ResponseOrderItemDto, orderItem, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    await this.findOne(id);

    const updatedOrderItem = await this.prismaService.orderItem.update({
      where: { id },
      data: updateOrderItemDto,
      include: {
        Goods: true,
        DiscountAccount: true,
        ReceivableAccount: true,
        VatAccount: true,
        CreditAccount: true,
        DebitAccount: true,
        ReturnAccount: true,
        Quote: true,
        PurchaseOrder: true,
        SaleDiscountVoucher: true,
        SalesReturn: true,
      },
    });

    return plainToInstance(ResponseOrderItemDto, updatedOrderItem, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.orderItem.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa chi tiết đơn hàng thành công' };
  }
}
