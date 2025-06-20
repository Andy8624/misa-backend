import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProvisionServiceVoucherService } from './provision_service_voucher.service';
import { CreateProvisionServiceVoucherDto } from './dto/create-provision_service_voucher.dto';
import { UpdateProvisionServiceVoucherDto } from './dto/update-provision_service_voucher.dto';

@Controller('provision-service-voucher')
export class ProvisionServiceVoucherController {
  constructor(private readonly provisionServiceVoucherService: ProvisionServiceVoucherService) {}

  @Post()
  create(@Body() createProvisionServiceVoucherDto: CreateProvisionServiceVoucherDto) {
    return this.provisionServiceVoucherService.create(createProvisionServiceVoucherDto);
  }

  @Get()
  findAll() {
    return this.provisionServiceVoucherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provisionServiceVoucherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProvisionServiceVoucherDto: UpdateProvisionServiceVoucherDto) {
    return this.provisionServiceVoucherService.update(+id, updateProvisionServiceVoucherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.provisionServiceVoucherService.remove(+id);
  }
}
