import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CashReceipService } from './cash_receip.service';
import { CreateCashReceipDto } from './dto/create-cash_receip.dto';
import { UpdateCashReceipDto } from './dto/update-cash_receip.dto';

@Controller('cash-receip')
export class CashReceipController {
  constructor(private readonly cashReceipService: CashReceipService) {}

  @Post()
  create(@Body() createCashReceipDto: CreateCashReceipDto) {
    return this.cashReceipService.create(createCashReceipDto);
  }

  @Get()
  findAll() {
    return this.cashReceipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashReceipService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashReceipDto: UpdateCashReceipDto) {
    return this.cashReceipService.update(+id, updateCashReceipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashReceipService.remove(+id);
  }
}
