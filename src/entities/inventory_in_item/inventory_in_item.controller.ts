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
import { InventoryInItemService } from './inventory_in_item.service';
import { CreateInventoryInItemDto } from './dto/create-inventory_in_item.dto';
import { UpdateInventoryInItemDto } from './dto/update-inventory_in_item.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';
import { InventoryInItemFilterType } from 'src/interfaces/inventory_in_item.interface';

@Controller('inventory-in-item')
@ApiTags('InventoryInItem')
export class InventoryInItemController {
  constructor(
    private readonly inventoryInItemService: InventoryInItemService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create Inventory in item')
  create(@Body() createInventoryInItemDto: CreateInventoryInItemDto) {
    return this.inventoryInItemService.create(createInventoryInItemDto);
  }

  @Get()
  @ApiProtectedEndpoint('Findall Inventory in item')
  findAll(@Query() param: InventoryInItemFilterType) {
    return this.inventoryInItemService.findAll(param);
  }

  @Get(':id')
  @ApiProtectedEndpoint('Findone Inventory in item')
  findOne(@Param('id') id: string) {
    return this.inventoryInItemService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Inventory in item')
  update(
    @Param('id') id: string,
    @Body() updateInventoryInItemDto: UpdateInventoryInItemDto,
  ) {
    return this.inventoryInItemService.update(id, updateInventoryInItemDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete Inventory in item')
  remove(@Param('id') id: string) {
    return this.inventoryInItemService.remove(id);
  }
}
