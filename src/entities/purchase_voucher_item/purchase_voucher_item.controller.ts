import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseVoucherItemService } from './purchase_voucher_item.service';
import { CreatePurchaseVoucherItemDto } from './dto/create-purchase_voucher_item.dto';
import { UpdatePurchaseVoucherItemDto } from './dto/update-purchase_voucher_item.dto';

@Controller('purchase-voucher-item')
export class PurchaseVoucherItemController {
  constructor(private readonly purchaseVoucherItemService: PurchaseVoucherItemService) {}

  @Post()
  create(@Body() createPurchaseVoucherItemDto: CreatePurchaseVoucherItemDto) {
    return this.purchaseVoucherItemService.create(createPurchaseVoucherItemDto);
  }

  @Get()
  findAll() {
    return this.purchaseVoucherItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseVoucherItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseVoucherItemDto: UpdatePurchaseVoucherItemDto) {
    return this.purchaseVoucherItemService.update(+id, updatePurchaseVoucherItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseVoucherItemService.remove(+id);
  }
}
