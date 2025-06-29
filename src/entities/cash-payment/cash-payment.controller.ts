import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CashPaymentService } from './cash-payment.service';
import { CreateCashPaymentDto } from './dto/create-cash-payment.dto';
import { UpdateCashPaymentDto } from './dto/update-cash-payment.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('cash-payment')
@ApiTags('CashPayment')
@ApiExtraModels(CreateCashPaymentDto, UpdateCashPaymentDto)
export class CashPaymentController {
  constructor(private readonly cashPaymentService: CashPaymentService) {}

  @Post()
  @ApiProtectedEndpoint('Create CashPayment')
  create(@Body() createCashPaymentDto: CreateCashPaymentDto) {
    return this.cashPaymentService.create(createCashPaymentDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find All CashPayment')
  findAll() {
    return this.cashPaymentService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one CashPayment')
  findOne(@Param('id') id: string) {
    return this.cashPaymentService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update CashPayment')
  update(
    @Param('id') id: string,
    @Body() updateCashPaymentDto: UpdateCashPaymentDto,
  ) {
    return this.cashPaymentService.update(id, updateCashPaymentDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete CashPayment')
  remove(@Param('id') id: string) {
    return this.cashPaymentService.remove(id);
  }
}
