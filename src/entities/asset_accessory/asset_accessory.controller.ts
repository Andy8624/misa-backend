import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssetAccessoryService } from './asset_accessory.service';
import { CreateAssetAccessoryDto } from './dto/create-asset_accessory.dto';
import { UpdateAssetAccessoryDto } from './dto/update-asset_accessory.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Asset Accessory')
@Controller('asset-accessory')
export class AssetAccessoryController {
  constructor(private readonly assetAccessoryService: AssetAccessoryService) {}

  @Post()
  @ApiProtectedEndpoint(
    'Create asset accessory',
    'Creates a new asset accessory',
  )
  create(@Body() dto: CreateAssetAccessoryDto) {
    return this.assetAccessoryService.create(dto);
  }

  @Get()
  @ApiProtectedEndpoint(
    'Get all asset accessories',
    'Returns all asset accessories',
  )
  findAll() {
    return this.assetAccessoryService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint(
    'Get asset accessory by ID',
    'Returns a single asset accessory by ID',
  )
  findOne(@Param('id') id: string) {
    return this.assetAccessoryService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint(
    'Update asset accessory',
    'Updates a single asset accessory',
  )
  update(@Param('id') id: string, @Body() dto: UpdateAssetAccessoryDto) {
    return this.assetAccessoryService.update(id, dto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint(
    'Delete asset accessory',
    'Soft deletes a single asset accessory',
  )
  remove(@Param('id') id: string) {
    return this.assetAccessoryService.remove(id);
  }
}
