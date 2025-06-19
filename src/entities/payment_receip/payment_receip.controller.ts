import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentReceipService } from './payment_receip.service';
import { CreatePaymentReceipDto } from './dto/create-payment_receip.dto';
import { UpdatePaymentReceipDto } from './dto/update-payment_receip.dto';

@Controller('payment-receip')
export class PaymentReceipController {
  constructor(private readonly paymentReceipService: PaymentReceipService) {}

  @Post()
  create(@Body() createPaymentReceipDto: CreatePaymentReceipDto) {
    return this.paymentReceipService.create(createPaymentReceipDto);
  }

  @Get()
  findAll() {
    return this.paymentReceipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentReceipService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentReceipDto: UpdatePaymentReceipDto) {
    return this.paymentReceipService.update(+id, updatePaymentReceipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentReceipService.remove(+id);
  }
}
