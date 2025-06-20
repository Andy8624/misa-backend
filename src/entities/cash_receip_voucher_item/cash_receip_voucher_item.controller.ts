import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CashReceipVoucherItemService } from './cash_receip_voucher_item.service';
import { CreateCashReceipVoucherItemDto } from './dto/create-cash_receip_voucher_item.dto';
import { UpdateCashReceipVoucherItemDto } from './dto/update-cash_receip_voucher_item.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('cash-receip-voucher-item')
@ApiTags('CashReceipVoucherItem')
export class CashReceipVoucherItemController {
  constructor(
    private readonly cashReceipVoucherItemService: CashReceipVoucherItemService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create CashReceipVoucherItem')
  create(
    @Body() createCashReceipVoucherItemDto: CreateCashReceipVoucherItemDto,
  ) {
    return this.cashReceipVoucherItemService.create(
      createCashReceipVoucherItemDto,
    );
  }

  @Get()
  @ApiProtectedEndpoint('Find all CashReceipVoucherItem')
  findAll() {
    return this.cashReceipVoucherItemService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one CashReceipVoucherItem')
  findOne(@Param('id') id: string) {
    return this.cashReceipVoucherItemService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update CashReceipVoucherItem')
  update(
    @Param('id') id: string,
    @Body() updateCashReceipVoucherItemDto: UpdateCashReceipVoucherItemDto,
  ) {
    return this.cashReceipVoucherItemService.update(
      id,
      updateCashReceipVoucherItemDto,
    );
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete CashReceipVoucherItem')
  remove(@Param('id') id: string) {
    return this.cashReceipVoucherItemService.remove(id);
  }
}
