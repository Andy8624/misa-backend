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
import { InventoryInService } from './inventory_in.service';
import { CreateInventoryInDto } from './dto/create-inventory_in.dto';
import { UpdateInventoryInDto } from './dto/update-inventory_in.dto';
import { InventoryInFilterType } from 'src/interfaces/inventory_in.interface';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('inventory-in')
@ApiTags('InventoryIn')
export class InventoryInController {
  constructor(private readonly inventoryInService: InventoryInService) {}

  @Post()
  @ApiProtectedEndpoint('Create Inventory in')
  create(@Body() createInventoryInDto: CreateInventoryInDto) {
    return this.inventoryInService.create(createInventoryInDto);
  }

  @Get()
  @ApiProtectedEndpoint('Findall Inventory in')
  findAll(@Query() param: InventoryInFilterType) {
    return this.inventoryInService.findAll(param);
  }

  @Get(':id')
  @ApiProtectedEndpoint('Findone Inventory in')
  findOne(@Param('id') id: string) {
    return this.inventoryInService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Inventory in')
  update(
    @Param('id') id: string,
    @Body() updateInventoryInDto: UpdateInventoryInDto,
  ) {
    return this.inventoryInService.update(id, updateInventoryInDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete Inventory in')
  remove(@Param('id') id: string) {
    return this.inventoryInService.remove(id);
  }
}
