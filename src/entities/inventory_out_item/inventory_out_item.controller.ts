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
import { InventoryOutItemService } from './inventory_out_item.service';
import { CreateInventoryOutItemDto } from './dto/create-inventory_out_item.dto';
import { UpdateInventoryOutItemDto } from './dto/update-inventory_out_item.dto';
import { InventoryOutFilterType } from 'src/interfaces/inventory_out.interface';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('inventory-out-item')
@ApiTags('InventoryOutItem')
export class InventoryOutItemController {
  constructor(
    private readonly inventoryOutItemService: InventoryOutItemService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create InventoryOutItem')
  create(@Body() createInventoryOutItemDto: CreateInventoryOutItemDto) {
    return this.inventoryOutItemService.create(createInventoryOutItemDto);
  }

  @Get()
  @ApiProtectedEndpoint('Findall InventoryOutItem')
  findAll(@Query() param: InventoryOutFilterType) {
    return this.inventoryOutItemService.findAll(param);
  }

  @Get(':id')
  @ApiProtectedEndpoint('Findone InventoryOutItem')
  findOne(@Param('id') id: string) {
    return this.inventoryOutItemService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update InventoryOutItem')
  update(
    @Param('id') id: string,
    @Body() updateInventoryOutItemDto: UpdateInventoryOutItemDto,
  ) {
    return this.inventoryOutItemService.update(id, updateInventoryOutItemDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete InventoryOutItem')
  remove(@Param('id') id: string) {
    return this.inventoryOutItemService.remove(id);
  }
}
