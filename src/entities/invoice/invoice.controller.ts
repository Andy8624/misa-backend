import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('invoice')
@ApiTags('Invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @ApiProtectedEndpoint('Create Invoice')
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all Invoice')
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one Invoice')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Invoice')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete Invoice')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(id);
  }

  @Post('file')
  @ApiProtectedEndpoint('Get XML File')
  getXMLFile(@Param('id') id: string) {
    return this.invoiceService.getXMLFile(id);
  }
}
