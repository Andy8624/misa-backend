import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProvisionServiceVoucherItemService } from './provision_service_voucher_item.service';
import { CreateProvisionServiceVoucherItemDto } from './dto/create-provision_service_voucher_item.dto';
import { UpdateProvisionServiceVoucherItemDto } from './dto/update-provision_service_voucher_item.dto';

@Controller('provision-service-voucher-item')
export class ProvisionServiceVoucherItemController {
  constructor(private readonly provisionServiceVoucherItemService: ProvisionServiceVoucherItemService) {}

  @Post()
  create(@Body() createProvisionServiceVoucherItemDto: CreateProvisionServiceVoucherItemDto) {
    return this.provisionServiceVoucherItemService.create(createProvisionServiceVoucherItemDto);
  }

  @Get()
  findAll() {
    return this.provisionServiceVoucherItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provisionServiceVoucherItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProvisionServiceVoucherItemDto: UpdateProvisionServiceVoucherItemDto) {
    return this.provisionServiceVoucherItemService.update(+id, updateProvisionServiceVoucherItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.provisionServiceVoucherItemService.remove(+id);
  }
}
