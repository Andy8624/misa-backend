import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentTermService } from './payment_term.service';
import { CreatePaymentTermDto } from './dto/create-payment_term.dto';
import { UpdatePaymentTermDto } from './dto/update-payment_term.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('payment-term')
@ApiTags('PaymentTerm')
export class PaymentTermController {
  constructor(private readonly paymentTermService: PaymentTermService) {}

  @Post()
  @ApiProtectedEndpoint('Create PaymentTerm')
  create(@Body() createPaymentTermDto: CreatePaymentTermDto) {
    return this.paymentTermService.create(createPaymentTermDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all PaymentTerm')
  findAll() {
    return this.paymentTermService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one PaymentTerm')
  findOne(@Param('id') id: string) {
    return this.paymentTermService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update PaymentTerm')
  update(
    @Param('id') id: string,
    @Body() updatePaymentTermDto: UpdatePaymentTermDto,
  ) {
    return this.paymentTermService.update(id, updatePaymentTermDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete PaymentTerm')
  remove(@Param('id') id: string) {
    return this.paymentTermService.remove(id);
  }
}
