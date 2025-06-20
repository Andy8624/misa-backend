import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProvisionServiceVoucherService } from './provision_service_voucher.service';
import { CreateProvisionServiceVoucherDto } from './dto/create-provision_service_voucher.dto';
import { UpdateProvisionServiceVoucherDto } from './dto/update-provision_service_voucher.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('provision-service-voucher')
@ApiTags('ProvisionServiceVoucher')
export class ProvisionServiceVoucherController {
  constructor(
    private readonly provisionServiceVoucherService: ProvisionServiceVoucherService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create ProvisionServiceVoucher')
  create(
    @Body() createProvisionServiceVoucherDto: CreateProvisionServiceVoucherDto,
  ) {
    return this.provisionServiceVoucherService.create(
      createProvisionServiceVoucherDto,
    );
  }

  @Get()
  @ApiProtectedEndpoint('Find all ProvisionServiceVoucher')
  findAll() {
    return this.provisionServiceVoucherService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one ProvisionServiceVoucher')
  findOne(@Param('id') id: string) {
    return this.provisionServiceVoucherService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update ProvisionServiceVoucher')
  update(
    @Param('id') id: string,
    @Body() updateProvisionServiceVoucherDto: UpdateProvisionServiceVoucherDto,
  ) {
    return this.provisionServiceVoucherService.update(
      id,
      updateProvisionServiceVoucherDto,
    );
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete ProvisionServiceVoucher')
  remove(@Param('id') id: string) {
    return this.provisionServiceVoucherService.remove(id);
  }
}
