import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PurchaseVoucherService } from './purchase_voucher.service';
import { CreatePurchaseVoucherDto } from './dto/create-purchase_voucher.dto';
import { UpdatePurchaseVoucherDto } from './dto/update-purchase_voucher.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('purchase-voucher')
@ApiTags('PurchaseVoucher')
export class PurchaseVoucherController {
  constructor(
    private readonly purchaseVoucherService: PurchaseVoucherService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create PurchaseVoucher')
  create(@Body() createPurchaseVoucherDto: CreatePurchaseVoucherDto) {
    return this.purchaseVoucherService.create(createPurchaseVoucherDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all PurchaseVoucher')
  findAll() {
    return this.purchaseVoucherService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one PurchaseVoucher')
  findOne(@Param('id') id: string) {
    return this.purchaseVoucherService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update PurchaseVoucher')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseVoucherDto: UpdatePurchaseVoucherDto,
  ) {
    return this.purchaseVoucherService.update(id, updatePurchaseVoucherDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete PurchaseVoucher')
  remove(@Param('id') id: string) {
    return this.purchaseVoucherService.remove(id);
  }
}
