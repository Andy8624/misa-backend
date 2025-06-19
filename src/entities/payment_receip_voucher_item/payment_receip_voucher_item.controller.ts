import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentReceipVoucherItemService } from './payment_receip_voucher_item.service';
import { CreatePaymentReceipVoucherItemDto } from './dto/create-payment_receip_voucher_item.dto';
import { UpdatePaymentReceipVoucherItemDto } from './dto/update-payment_receip_voucher_item.dto';

@Controller('payment-receip-voucher-item')
export class PaymentReceipVoucherItemController {
  constructor(private readonly paymentReceipVoucherItemService: PaymentReceipVoucherItemService) {}

  @Post()
  create(@Body() createPaymentReceipVoucherItemDto: CreatePaymentReceipVoucherItemDto) {
    return this.paymentReceipVoucherItemService.create(createPaymentReceipVoucherItemDto);
  }

  @Get()
  findAll() {
    return this.paymentReceipVoucherItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentReceipVoucherItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentReceipVoucherItemDto: UpdatePaymentReceipVoucherItemDto) {
    return this.paymentReceipVoucherItemService.update(+id, updatePaymentReceipVoucherItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentReceipVoucherItemService.remove(+id);
  }
}
