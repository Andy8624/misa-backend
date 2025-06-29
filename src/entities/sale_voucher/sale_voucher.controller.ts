import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SaleVoucherService } from './sale_voucher.service';
import { CreateSaleVoucherDto } from './dto/create-sale_voucher.dto';
import { UpdateSaleVoucherDto } from './dto/update-sale_voucher.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('sale-voucher')
@ApiTags('SaleVoucher')
export class SaleVoucherController {
  constructor(private readonly saleVoucherService: SaleVoucherService) {}

  @Post()
  @ApiProtectedEndpoint('Create SaleVoucher')
  @ApiBody({
    type: CreateSaleVoucherDto,
    description:
      'Create a new sale voucher, optionally including a Base64 file attachment.',
  })
  create(@Body() createSaleVoucherDto: CreateSaleVoucherDto) {
    return this.saleVoucherService.create(createSaleVoucherDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all SaleVoucher')
  findAll() {
    return this.saleVoucherService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one SaleVoucher')
  findOne(@Param('id') id: string) {
    return this.saleVoucherService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update SaleVoucher')
  update(
    @Param('id') id: string,
    @Body() updateSaleVoucherDto: UpdateSaleVoucherDto,
  ) {
    return this.saleVoucherService.update(id, updateSaleVoucherDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete SaleVoucher')
  remove(@Param('id') id: string) {
    return this.saleVoucherService.remove(id);
  }
}
