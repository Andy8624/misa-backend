import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaleVoucherItemService } from './sale_voucher_item.service';
import { CreateSaleVoucherItemDto } from './dto/create-sale_voucher_item.dto';
import { UpdateSaleVoucherItemDto } from './dto/update-sale_voucher_item.dto';

@Controller('sale-voucher-item')
export class SaleVoucherItemController {
  constructor(private readonly saleVoucherItemService: SaleVoucherItemService) {}

  @Post()
  create(@Body() createSaleVoucherItemDto: CreateSaleVoucherItemDto) {
    return this.saleVoucherItemService.create(createSaleVoucherItemDto);
  }

  @Get()
  findAll() {
    return this.saleVoucherItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleVoucherItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleVoucherItemDto: UpdateSaleVoucherItemDto) {
    return this.saleVoucherItemService.update(+id, updateSaleVoucherItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleVoucherItemService.remove(+id);
  }
}
