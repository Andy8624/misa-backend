import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicePurchaseVoucherItemService } from './service_purchase_voucher_item.service';
import { CreateServicePurchaseVoucherItemDto } from './dto/create-service_purchase_voucher_item.dto';
import { UpdateServicePurchaseVoucherItemDto } from './dto/update-service_purchase_voucher_item.dto';

@Controller('service-purchase-voucher-item')
export class ServicePurchaseVoucherItemController {
  constructor(private readonly servicePurchaseVoucherItemService: ServicePurchaseVoucherItemService) {}

  @Post()
  create(@Body() createServicePurchaseVoucherItemDto: CreateServicePurchaseVoucherItemDto) {
    return this.servicePurchaseVoucherItemService.create(createServicePurchaseVoucherItemDto);
  }

  @Get()
  findAll() {
    return this.servicePurchaseVoucherItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicePurchaseVoucherItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicePurchaseVoucherItemDto: UpdateServicePurchaseVoucherItemDto) {
    return this.servicePurchaseVoucherItemService.update(+id, updateServicePurchaseVoucherItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicePurchaseVoucherItemService.remove(+id);
  }
}
