import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VoucherAccountEntryService } from './voucher_account_entry.service';
import { CreateVoucherAccountEntryDto } from './dto/create-voucher_account_entry.dto';
import { UpdateVoucherAccountEntryDto } from './dto/update-voucher_account_entry.dto';

@Controller('voucher-account-entry')
export class VoucherAccountEntryController {
  constructor(private readonly voucherAccountEntryService: VoucherAccountEntryService) {}

  @Post()
  create(@Body() createVoucherAccountEntryDto: CreateVoucherAccountEntryDto) {
    return this.voucherAccountEntryService.create(createVoucherAccountEntryDto);
  }

  @Get()
  findAll() {
    return this.voucherAccountEntryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voucherAccountEntryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoucherAccountEntryDto: UpdateVoucherAccountEntryDto) {
    return this.voucherAccountEntryService.update(+id, updateVoucherAccountEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voucherAccountEntryService.remove(+id);
  }
}
