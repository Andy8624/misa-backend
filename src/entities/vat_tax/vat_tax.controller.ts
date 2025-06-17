import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VatTaxService } from './vat_tax.service';
import { CreateVatTaxDto } from './dto/create-vat_tax.dto';
import { UpdateVatTaxDto } from './dto/update-vat_tax.dto';
import { VatTaxFilterType } from 'src/interfaces/vat_tax.interface';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('VAT Tax')
@Controller('vat-taxes')
export class VatTaxController {
  constructor(private readonly vatTaxService: VatTaxService) {}

  @Post()
  @ApiProtectedEndpoint('Create VAT Tax')
  create(@Body() createVatTaxDto: CreateVatTaxDto) {
    return this.vatTaxService.create(createVatTaxDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find All VAT Tax')
  findAll(@Query() param: VatTaxFilterType) {
    return this.vatTaxService.findAll(param);
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find VAT Tax by ID')
  findOne(@Param('id') id: string) {
    return this.vatTaxService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update VAT Tax')
  update(@Param('id') id: string, @Body() updateVatTaxDto: UpdateVatTaxDto) {
    return this.vatTaxService.update(id, updateVatTaxDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete VAT Tax')
  remove(@Param('id') id: string) {
    return this.vatTaxService.remove(id);
  }
}
