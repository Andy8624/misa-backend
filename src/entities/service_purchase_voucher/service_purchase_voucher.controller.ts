import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicePurchaseVoucherService } from './service_purchase_voucher.service';
import { CreateServicePurchaseVoucherDto } from './dto/create-service_purchase_voucher.dto';
import { UpdateServicePurchaseVoucherDto } from './dto/update-service_purchase_voucher.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('service-purchase-voucher')
@ApiTags('ServicePurchaseVoucher')
export class ServicePurchaseVoucherController {
  constructor(
    private readonly servicePurchaseVoucherService: ServicePurchaseVoucherService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create ServicePurchaseVoucher')
  create(
    @Body() createServicePurchaseVoucherDto: CreateServicePurchaseVoucherDto,
  ) {
    return this.servicePurchaseVoucherService.create(
      createServicePurchaseVoucherDto,
    );
  }

  @Get()
  @ApiProtectedEndpoint('Find all ServicePurchaseVoucher')
  findAll() {
    return this.servicePurchaseVoucherService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one ServicePurchaseVoucher')
  findOne(@Param('id') id: string) {
    return this.servicePurchaseVoucherService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update ServicePurchaseVoucher')
  update(
    @Param('id') id: string,
    @Body() updateServicePurchaseVoucherDto: UpdateServicePurchaseVoucherDto,
  ) {
    return this.servicePurchaseVoucherService.update(
      id,
      updateServicePurchaseVoucherDto,
    );
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete ServicePurchaseVoucher')
  remove(@Param('id') id: string) {
    return this.servicePurchaseVoucherService.remove(id);
  }
}
