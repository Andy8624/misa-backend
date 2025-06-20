import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentTermService } from './payment_term.service';
import { CreatePaymentTermDto } from './dto/create-payment_term.dto';
import { UpdatePaymentTermDto } from './dto/update-payment_term.dto';

@Controller('payment-term')
export class PaymentTermController {
  constructor(private readonly paymentTermService: PaymentTermService) {}

  @Post()
  create(@Body() createPaymentTermDto: CreatePaymentTermDto) {
    return this.paymentTermService.create(createPaymentTermDto);
  }

  @Get()
  findAll() {
    return this.paymentTermService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentTermService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentTermDto: UpdatePaymentTermDto) {
    return this.paymentTermService.update(+id, updatePaymentTermDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentTermService.remove(+id);
  }
}
