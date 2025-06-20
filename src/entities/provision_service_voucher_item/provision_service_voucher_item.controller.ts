import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProvisionServiceVoucherItemService } from './provision_service_voucher_item.service';
import { CreateProvisionServiceVoucherItemDto } from './dto/create-provision_service_voucher_item.dto';
import { UpdateProvisionServiceVoucherItemDto } from './dto/update-provision_service_voucher_item.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('provision-service-voucher-item')
@ApiTags('ProvisionServiceVoucherItem')
export class ProvisionServiceVoucherItemController {
  constructor(
    private readonly provisionServiceVoucherItemService: ProvisionServiceVoucherItemService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create ProvisionServiceVoucherItem')
  create(
    @Body()
    createProvisionServiceVoucherItemDto: CreateProvisionServiceVoucherItemDto,
  ) {
    return this.provisionServiceVoucherItemService.create(
      createProvisionServiceVoucherItemDto,
    );
  }

  @Get()
  @ApiProtectedEndpoint('Find all ProvisionServiceVoucherItem')
  findAll() {
    return this.provisionServiceVoucherItemService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one ProvisionServiceVoucherItem')
  findOne(@Param('id') id: string) {
    return this.provisionServiceVoucherItemService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update ProvisionServiceVoucherItem')
  update(
    @Param('id') id: string,
    @Body()
    updateProvisionServiceVoucherItemDto: UpdateProvisionServiceVoucherItemDto,
  ) {
    return this.provisionServiceVoucherItemService.update(
      id,
      updateProvisionServiceVoucherItemDto,
    );
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete ProvisionServiceVoucherItem')
  remove(@Param('id') id: string) {
    return this.provisionServiceVoucherItemService.remove(id);
  }
}
