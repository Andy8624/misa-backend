import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SaleDiscountVoucherService } from './sale_discount_voucher.service';
import { CreateSaleDiscountVoucherDto } from './dto/create-sale_discount_voucher.dto';
import { UpdateSaleDiscountVoucherDto } from './dto/update-sale_discount_voucher.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('sale-discount-voucher')
@ApiTags('SaleDiscountVoucher')
export class SaleDiscountVoucherController {
  constructor(
    private readonly saleDiscountVoucherService: SaleDiscountVoucherService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create SaleDiscountVoucher')
  create(@Body() createSaleDiscountVoucherDto: CreateSaleDiscountVoucherDto) {
    return this.saleDiscountVoucherService.create(createSaleDiscountVoucherDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all SaleDiscountVoucher')
  findAll() {
    return this.saleDiscountVoucherService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one SaleDiscountVoucher')
  findOne(@Param('id') id: string) {
    return this.saleDiscountVoucherService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update SaleDiscountVoucher')
  update(
    @Param('id') id: string,
    @Body() updateSaleDiscountVoucherDto: UpdateSaleDiscountVoucherDto,
  ) {
    return this.saleDiscountVoucherService.update(
      id,
      updateSaleDiscountVoucherDto,
    );
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete SaleDiscountVoucher')
  remove(@Param('id') id: string) {
    return this.saleDiscountVoucherService.remove(id);
  }
}
