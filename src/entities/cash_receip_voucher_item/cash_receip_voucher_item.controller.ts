import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CashReceipVoucherItemService } from './cash_receip_voucher_item.service';
import { CreateCashReceipVoucherItemDto } from './dto/create-cash_receip_voucher_item.dto';
import { UpdateCashReceipVoucherItemDto } from './dto/update-cash_receip_voucher_item.dto';

@Controller('cash-receip-voucher-item')
export class CashReceipVoucherItemController {
  constructor(private readonly cashReceipVoucherItemService: CashReceipVoucherItemService) {}

  @Post()
  create(@Body() createCashReceipVoucherItemDto: CreateCashReceipVoucherItemDto) {
    return this.cashReceipVoucherItemService.create(createCashReceipVoucherItemDto);
  }

  @Get()
  findAll() {
    return this.cashReceipVoucherItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashReceipVoucherItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashReceipVoucherItemDto: UpdateCashReceipVoucherItemDto) {
    return this.cashReceipVoucherItemService.update(+id, updateCashReceipVoucherItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashReceipVoucherItemService.remove(+id);
  }
}
