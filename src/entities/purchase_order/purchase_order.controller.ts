import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PurchaseOrderService } from './purchase_order.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase_order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase_order.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('purchase-order')
@ApiTags('PurchaseOrder')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}

  @Post()
  @ApiProtectedEndpoint('Create PurchaseOrder')
  create(@Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return this.purchaseOrderService.create(createPurchaseOrderDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all PurchaseOrder')
  findAll() {
    return this.purchaseOrderService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one PurchaseOrder')
  findOne(@Param('id') id: string) {
    return this.purchaseOrderService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update PurchaseOrder')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto,
  ) {
    return this.purchaseOrderService.update(id, updatePurchaseOrderDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete PurchaseOrder')
  remove(@Param('id') id: string) {
    return this.purchaseOrderService.remove(id);
  }
}
