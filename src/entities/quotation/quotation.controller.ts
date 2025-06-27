import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('quotation')
@ApiTags('Quotation')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  @Post()
  @ApiProtectedEndpoint('Create Quotation')
  create(@Body() createQuotationDto: CreateQuotationDto) {
    return this.quotationService.create(createQuotationDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all Quotation')
  findAll() {
    return this.quotationService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one Quotation')
  findOne(@Param('id') id: string) {
    return this.quotationService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Quotation')
  update(
    @Param('id') id: string,
    @Body() updateQuotationDto: UpdateQuotationDto,
  ) {
    return this.quotationService.update(id, updateQuotationDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete Quotation')
  remove(@Param('id') id: string) {
    return this.quotationService.remove(id);
  }
}
