import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderItemService } from './order_item.service';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('order-item')
@ApiTags('OrderItem')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  @ApiProtectedEndpoint('Create OrderItem')
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all OrderItem')
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one OrderItem')
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update OrderItem')
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemService.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete OrderItem')
  remove(@Param('id') id: string) {
    return this.orderItemService.remove(id);
  }
}
