import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CashPaymentVoucherItemService } from './cash-payment-voucher-item.service';
import { CreateCashPaymentVoucherItemDto } from './dto/create-cash-payment-voucher-item.dto';
import { UpdateCashPaymentVoucherItemDto } from './dto/update-cash-payment-voucher-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('cash-payment-voucher-item')
@ApiTags('CashPayemntVoucherItem')
export class CashPaymentVoucherItemController {
  constructor(
    private readonly cashPaymentVoucherItemService: CashPaymentVoucherItemService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create CashPayemntVoucherItem')
  create(
    @Body() createCashPaymentVoucherItemDto: CreateCashPaymentVoucherItemDto,
  ) {
    return this.cashPaymentVoucherItemService.create(
      createCashPaymentVoucherItemDto,
    );
  }

  @Get()
  @ApiProtectedEndpoint('Find all CashPayemntVoucherItem')
  findAll() {
    return this.cashPaymentVoucherItemService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one CashPayemntVoucherItem')
  findOne(@Param('id') id: string) {
    return this.cashPaymentVoucherItemService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update CashPayemntVoucherItem')
  update(
    @Param('id') id: string,
    @Body() updateCashPaymentVoucherItemDto: UpdateCashPaymentVoucherItemDto,
  ) {
    return this.cashPaymentVoucherItemService.update(
      id,
      updateCashPaymentVoucherItemDto,
    );
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete CashPayemntVoucherItem')
  remove(@Param('id') id: string) {
    return this.cashPaymentVoucherItemService.remove(id);
  }
}
