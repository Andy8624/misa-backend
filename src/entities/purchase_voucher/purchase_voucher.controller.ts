import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseVoucherService } from './purchase_voucher.service';
import { CreatePurchaseVoucherDto } from './dto/create-purchase_voucher.dto';
import { UpdatePurchaseVoucherDto } from './dto/update-purchase_voucher.dto';

@Controller('purchase-voucher')
export class PurchaseVoucherController {
  constructor(private readonly purchaseVoucherService: PurchaseVoucherService) {}

  @Post()
  create(@Body() createPurchaseVoucherDto: CreatePurchaseVoucherDto) {
    return this.purchaseVoucherService.create(createPurchaseVoucherDto);
  }

  @Get()
  findAll() {
    return this.purchaseVoucherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseVoucherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseVoucherDto: UpdatePurchaseVoucherDto) {
    return this.purchaseVoucherService.update(+id, updatePurchaseVoucherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseVoucherService.remove(+id);
  }
}
