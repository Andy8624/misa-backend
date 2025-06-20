import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SaleVoucherItemService } from './sale_voucher_item.service';
import { CreateSaleVoucherItemDto } from './dto/create-sale_voucher_item.dto';
import { UpdateSaleVoucherItemDto } from './dto/update-sale_voucher_item.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('sale-voucher-item')
@ApiTags('SaleVoucherItem')
export class SaleVoucherItemController {
  constructor(
    private readonly saleVoucherItemService: SaleVoucherItemService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create SaleVoucherItem')
  create(@Body() createSaleVoucherItemDto: CreateSaleVoucherItemDto) {
    return this.saleVoucherItemService.create(createSaleVoucherItemDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all SaleVoucherItem')
  findAll() {
    return this.saleVoucherItemService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one SaleVoucherItem')
  findOne(@Param('id') id: string) {
    return this.saleVoucherItemService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update SaleVoucherItem')
  update(
    @Param('id') id: string,
    @Body() updateSaleVoucherItemDto: UpdateSaleVoucherItemDto,
  ) {
    return this.saleVoucherItemService.update(id, updateSaleVoucherItemDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete SaleVoucherItem')
  remove(@Param('id') id: string) {
    return this.saleVoucherItemService.remove(id);
  }
}
