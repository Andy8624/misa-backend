import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VoucherAccountEntryService } from './voucher_account_entry.service';
import { CreateVoucherAccountEntryDto } from './dto/create-voucher_account_entry.dto';
import { UpdateVoucherAccountEntryDto } from './dto/update-voucher_account_entry.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('voucher-account-entry')
@ApiTags('VoucherAccountEntry')
export class VoucherAccountEntryController {
  constructor(
    private readonly voucherAccountEntryService: VoucherAccountEntryService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create VoucherAccountEntry')
  create(@Body() createVoucherAccountEntryDto: CreateVoucherAccountEntryDto) {
    return this.voucherAccountEntryService.create(createVoucherAccountEntryDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all VoucherAccountEntry')
  findAll() {
    return this.voucherAccountEntryService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one VoucherAccountEntry')
  findOne(@Param('id') id: string) {
    return this.voucherAccountEntryService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update VoucherAccountEntry')
  update(
    @Param('id') id: string,
    @Body() updateVoucherAccountEntryDto: UpdateVoucherAccountEntryDto,
  ) {
    return this.voucherAccountEntryService.update(
      id,
      updateVoucherAccountEntryDto,
    );
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete VoucherAccountEntry')
  remove(@Param('id') id: string) {
    return this.voucherAccountEntryService.remove(id);
  }
}
