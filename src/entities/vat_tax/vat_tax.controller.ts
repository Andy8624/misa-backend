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

@Controller('vat-taxes')
export class VatTaxController {
  constructor(private readonly vatTaxService: VatTaxService) {}

  @Post()
  create(@Body() createVatTaxDto: CreateVatTaxDto) {
    return this.vatTaxService.create(createVatTaxDto);
  }

  @Get()
  findAll(@Query() param: VatTaxFilterType) {
    return this.vatTaxService.findAll(param);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vatTaxService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVatTaxDto: UpdateVatTaxDto) {
    return this.vatTaxService.update(id, updateVatTaxDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vatTaxService.remove(id);
  }
}
