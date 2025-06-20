import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DepositPaymentItemService } from './deposit_payment_item.service';
import { CreateDepositPaymentItemDto } from './dto/create-deposit_payment_item.dto';
import { UpdateDepositPaymentItemDto } from './dto/update-deposit_payment_item.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('deposit-payment-item')
@ApiTags('DepositPaymentItem')
export class DepositPaymentItemController {
  constructor(
    private readonly depositPaymentItemService: DepositPaymentItemService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create DepositPaymentItem')
  create(@Body() createDepositPaymentItemDto: CreateDepositPaymentItemDto) {
    return this.depositPaymentItemService.create(createDepositPaymentItemDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all DepositPaymentItem')
  findAll() {
    return this.depositPaymentItemService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one DepositPaymentItem')
  findOne(@Param('id') id: string) {
    return this.depositPaymentItemService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update DepositPaymentItem')
  update(
    @Param('id') id: string,
    @Body() updateDepositPaymentItemDto: UpdateDepositPaymentItemDto,
  ) {
    return this.depositPaymentItemService.update(
      id,
      updateDepositPaymentItemDto,
    );
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete DepositPaymentItem')
  remove(@Param('id') id: string) {
    return this.depositPaymentItemService.remove(id);
  }
}
