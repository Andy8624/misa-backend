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
import { ProductionOrderService } from './production_order.service';
import { CreateProductionOrderDto } from './dto/create-production_order.dto';
import { UpdateProductionOrderDto } from './dto/update-production_order.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';
import { ProductionOrderFilterType } from 'src/interfaces/production_order.interface';

@Controller('production-order')
@ApiTags('ProductionOrder')
export class ProductionOrderController {
  constructor(
    private readonly productionOrderService: ProductionOrderService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create Production order')
  create(@Body() createProductionOrderDto: CreateProductionOrderDto) {
    return this.productionOrderService.create(createProductionOrderDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all Production order')
  findAll(@Query() param: ProductionOrderFilterType) {
    return this.productionOrderService.findAll(param);
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one Production order')
  findOne(@Param('id') id: string) {
    return this.productionOrderService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Production order')
  update(
    @Param('id') id: string,
    @Body() updateProductionOrderDto: UpdateProductionOrderDto,
  ) {
    return this.productionOrderService.update(id, updateProductionOrderDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete Production order')
  remove(@Param('id') id: string) {
    return this.productionOrderService.remove(id);
  }
}
