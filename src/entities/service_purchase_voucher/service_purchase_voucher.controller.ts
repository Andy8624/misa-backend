import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicePurchaseVoucherService } from './service_purchase_voucher.service';
import { CreateServicePurchaseVoucherDto } from './dto/create-service_purchase_voucher.dto';
import { UpdateServicePurchaseVoucherDto } from './dto/update-service_purchase_voucher.dto';

@Controller('service-purchase-voucher')
export class ServicePurchaseVoucherController {
  constructor(private readonly servicePurchaseVoucherService: ServicePurchaseVoucherService) {}

  @Post()
  create(@Body() createServicePurchaseVoucherDto: CreateServicePurchaseVoucherDto) {
    return this.servicePurchaseVoucherService.create(createServicePurchaseVoucherDto);
  }

  @Get()
  findAll() {
    return this.servicePurchaseVoucherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicePurchaseVoucherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicePurchaseVoucherDto: UpdateServicePurchaseVoucherDto) {
    return this.servicePurchaseVoucherService.update(+id, updateServicePurchaseVoucherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicePurchaseVoucherService.remove(+id);
  }
}
