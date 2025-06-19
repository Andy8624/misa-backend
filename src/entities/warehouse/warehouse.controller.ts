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
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { ApiTags } from '@nestjs/swagger';
import { WarehouseFilterType } from 'src/interfaces/warehouse.interface';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('warehouse')
@ApiTags('Warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  @ApiProtectedEndpoint('Create Warehouse')
  create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehouseService.create(createWarehouseDto);
  }

  @Get()
  @ApiProtectedEndpoint('Findall Warehouse')
  findAll(@Query() param: WarehouseFilterType) {
    return this.warehouseService.findAll(param);
  }

  @Get(':id')
  @ApiProtectedEndpoint('FindOne Warehouse')
  findOne(@Param('id') id: string) {
    return this.warehouseService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Warehouse')
  update(
    @Param('id') id: string,
    @Body() updateWarehouseDto: UpdateWarehouseDto,
  ) {
    return this.warehouseService.update(id, updateWarehouseDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete Warehouse')
  remove(@Param('id') id: string) {
    return this.warehouseService.remove(id);
  }
}
