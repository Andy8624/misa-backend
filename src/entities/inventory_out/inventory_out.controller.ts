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
import { InventoryOutService } from './inventory_out.service';
import { CreateInventoryOutDto } from './dto/create-inventory_out.dto';
import { UpdateInventoryOutDto } from './dto/update-inventory_out.dto';
import { InventoryOutFilterType } from 'src/interfaces/inventory_out.interface';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('inventory-out')
@ApiTags('InventoryOut')
export class InventoryOutController {
  constructor(private readonly inventoryOutService: InventoryOutService) {}

  @Post()
  @ApiProtectedEndpoint('Create Inventory out')
  create(@Body() createInventoryOutDto: CreateInventoryOutDto) {
    return this.inventoryOutService.create(createInventoryOutDto);
  }

  @Get()
  @ApiProtectedEndpoint('Findall Inventory out')
  findAll(@Query() param: InventoryOutFilterType) {
    return this.inventoryOutService.findAll(param);
  }

  @Get(':id')
  @ApiProtectedEndpoint('Findone Inventory out')
  findOne(@Param('id') id: string) {
    return this.inventoryOutService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Inventory out')
  update(
    @Param('id') id: string,
    @Body() updateInventoryOutDto: UpdateInventoryOutDto,
  ) {
    return this.inventoryOutService.update(id, updateInventoryOutDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete Inventory out')
  remove(@Param('id') id: string) {
    return this.inventoryOutService.remove(id);
  }
}
