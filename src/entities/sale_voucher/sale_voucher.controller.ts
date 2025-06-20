import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaleVoucherService } from './sale_voucher.service';
import { CreateSaleVoucherDto } from './dto/create-sale_voucher.dto';
import { UpdateSaleVoucherDto } from './dto/update-sale_voucher.dto';

@Controller('sale-voucher')
export class SaleVoucherController {
  constructor(private readonly saleVoucherService: SaleVoucherService) {}

  @Post()
  create(@Body() createSaleVoucherDto: CreateSaleVoucherDto) {
    return this.saleVoucherService.create(createSaleVoucherDto);
  }

  @Get()
  findAll() {
    return this.saleVoucherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleVoucherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleVoucherDto: UpdateSaleVoucherDto) {
    return this.saleVoucherService.update(+id, updateSaleVoucherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleVoucherService.remove(+id);
  }
}
