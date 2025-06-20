import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PurchaseVoucherItemService } from './purchase_voucher_item.service';
import { CreatePurchaseVoucherItemDto } from './dto/create-purchase_voucher_item.dto';
import { UpdatePurchaseVoucherItemDto } from './dto/update-purchase_voucher_item.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('purchase-voucher-item')
@ApiTags('PurchaseVoucherItem')
export class PurchaseVoucherItemController {
  constructor(
    private readonly purchaseVoucherItemService: PurchaseVoucherItemService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create PurchaseVoucherItem')
  create(@Body() createPurchaseVoucherItemDto: CreatePurchaseVoucherItemDto) {
    return this.purchaseVoucherItemService.create(createPurchaseVoucherItemDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all PurchaseVoucherItem')
  findAll() {
    return this.purchaseVoucherItemService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one PurchaseVoucherItem')
  findOne(@Param('id') id: string) {
    return this.purchaseVoucherItemService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update PurchaseVoucherItem')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseVoucherItemDto: UpdatePurchaseVoucherItemDto,
  ) {
    return this.purchaseVoucherItemService.update(
      id,
      updatePurchaseVoucherItemDto,
    );
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete PurchaseVoucherItem')
  remove(@Param('id') id: string) {
    return this.purchaseVoucherItemService.remove(id);
  }
}
