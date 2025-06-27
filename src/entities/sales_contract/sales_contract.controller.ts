import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalesContractService } from './sales_contract.service';
import { CreateSalesContractDto } from './dto/create-sales_contract.dto';
import { UpdateSalesContractDto } from './dto/update-sales_contract.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('sales-contract')
@ApiTags('SalesContract')
export class SalesContractController {
  constructor(private readonly salesContractService: SalesContractService) {}

  @Post()
  @ApiProtectedEndpoint('Create SalesContract')
  create(@Body() createSalesContractDto: CreateSalesContractDto) {
    return this.salesContractService.create(createSalesContractDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all SalesContract')
  findAll() {
    return this.salesContractService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one SalesContract')
  findOne(@Param('id') id: string) {
    return this.salesContractService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update SalesContract')
  update(
    @Param('id') id: string,
    @Body() updateSalesContractDto: UpdateSalesContractDto,
  ) {
    return this.salesContractService.update(id, updateSalesContractDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete SalesContract')
  remove(@Param('id') id: string) {
    return this.salesContractService.remove(id);
  }
}
