import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicePurchaseVoucherItemService } from './service_purchase_voucher_item.service';
import { CreateServicePurchaseVoucherItemDto } from './dto/create-service_purchase_voucher_item.dto';
import { UpdateServicePurchaseVoucherItemDto } from './dto/update-service_purchase_voucher_item.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('service-purchase-voucher-item')
@ApiTags('ServicePurchaseVoucherItem')
export class ServicePurchaseVoucherItemController {
  constructor(
    private readonly servicePurchaseVoucherItemService: ServicePurchaseVoucherItemService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create ServicePurchaseVoucherItem')
  create(
    @Body()
    createServicePurchaseVoucherItemDto: CreateServicePurchaseVoucherItemDto,
  ) {
    return this.servicePurchaseVoucherItemService.create(
      createServicePurchaseVoucherItemDto,
    );
  }

  @Get()
  @ApiProtectedEndpoint('Find all ServicePurchaseVoucherItem')
  findAll() {
    return this.servicePurchaseVoucherItemService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one ServicePurchaseVoucherItem')
  findOne(@Param('id') id: string) {
    return this.servicePurchaseVoucherItemService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update ServicePurchaseVoucherItem')
  update(
    @Param('id') id: string,
    @Body()
    updateServicePurchaseVoucherItemDto: UpdateServicePurchaseVoucherItemDto,
  ) {
    return this.servicePurchaseVoucherItemService.update(
      id,
      updateServicePurchaseVoucherItemDto,
    );
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete ServicePurchaseVoucherItem')
  remove(@Param('id') id: string) {
    return this.servicePurchaseVoucherItemService.remove(id);
  }
}
