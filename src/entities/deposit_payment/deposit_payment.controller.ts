import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DepositPaymentService } from './deposit_payment.service';
import { CreateDepositPaymentDto } from './dto/create-deposit_payment.dto';
import { UpdateDepositPaymentDto } from './dto/update-deposit_payment.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('deposit-payment')
@ApiTags('DepositPayment')
export class DepositPaymentController {
  constructor(private readonly depositPaymentService: DepositPaymentService) {}

  @Post()
  @ApiProtectedEndpoint('Create DepositPayment')
  create(@Body() createDepositPaymentDto: CreateDepositPaymentDto) {
    return this.depositPaymentService.create(createDepositPaymentDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all DepositPayment')
  findAll() {
    return this.depositPaymentService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one DepositPayment')
  findOne(@Param('id') id: string) {
    return this.depositPaymentService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update DepositPayment')
  update(
    @Param('id') id: string,
    @Body() updateDepositPaymentDto: UpdateDepositPaymentDto,
  ) {
    return this.depositPaymentService.update(id, updateDepositPaymentDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete DepositPayment')
  remove(@Param('id') id: string) {
    return this.depositPaymentService.remove(id);
  }
}
