import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalesReturnService } from './sales_return.service';
import { CreateSalesReturnDto } from './dto/create-sales_return.dto';
import { UpdateSalesReturnDto } from './dto/update-sales_return.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('sales-return')
@ApiTags('SalesReturn')
export class SalesReturnController {
  constructor(private readonly salesReturnService: SalesReturnService) {}

  @Post()
  @ApiProtectedEndpoint('Create SalesReturn')
  create(@Body() createSalesReturnDto: CreateSalesReturnDto) {
    return this.salesReturnService.create(createSalesReturnDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all SalesReturn')
  findAll() {
    return this.salesReturnService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one SalesReturn')
  findOne(@Param('id') id: string) {
    return this.salesReturnService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update SalesReturn')
  update(
    @Param('id') id: string,
    @Body() updateSalesReturnDto: UpdateSalesReturnDto,
  ) {
    return this.salesReturnService.update(id, updateSalesReturnDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete SalesReturn')
  remove(@Param('id') id: string) {
    return this.salesReturnService.remove(id);
  }
}
