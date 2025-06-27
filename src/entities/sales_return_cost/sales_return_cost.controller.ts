import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalesReturnCostService } from './sales_return_cost.service';
import { UpdateSalesReturnCostDto } from './dto/update-sales_return_cost.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';
import { CreateSalesReturnCostDto } from './dto/create-sales_return_cost.dto';

@Controller('sales-return-cost')
@ApiTags('SalesReturnCost')
export class SalesReturnCostController {
  constructor(
    private readonly salesReturnCostService: SalesReturnCostService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create SalesReturnCost')
  create(@Body() createSalesReturnCostDto: CreateSalesReturnCostDto) {
    return this.salesReturnCostService.create(createSalesReturnCostDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all SalesReturnCost')
  findAll() {
    return this.salesReturnCostService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one SalesReturnCost')
  findOne(@Param('id') id: string) {
    return this.salesReturnCostService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update SalesReturnCost')
  update(
    @Param('id') id: string,
    @Body() updateSalesReturnCostDto: UpdateSalesReturnCostDto,
  ) {
    return this.salesReturnCostService.update(id, updateSalesReturnCostDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete SalesReturnCost')
  remove(@Param('id') id: string) {
    return this.salesReturnCostService.remove(id);
  }
}
