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
import { AssetTypeService } from './asset_type.service';
import { CreateAssetTypeDto } from './dto/create-asset_type.dto';
import { UpdateAssetTypeDto } from './dto/update-asset_type.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Asset Type')
@Controller('asset-type')
export class AssetTypeController {
  constructor(private readonly assetTypeService: AssetTypeService) {}

  @Post()
  @ApiProtectedEndpoint('Create asset type', 'Creates a new asset type')
  create(@Body() createAssetTypeDto: CreateAssetTypeDto) {
    return this.assetTypeService.create(createAssetTypeDto);
  }

  @Get()
  @ApiProtectedEndpoint(
    'Get all asset types',
    'Returns a list of all asset types',
  )
  findAll() {
    return this.assetTypeService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint(
    'Get asset type by ID',
    'Returns a single asset type by ID',
  )
  findOne(@Param('id') id: string) {
    return this.assetTypeService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update asset type', 'Updates an existing asset type')
  update(
    @Param('id') id: string,
    @Body() updateAssetTypeDto: UpdateAssetTypeDto,
  ) {
    return this.assetTypeService.update(id, updateAssetTypeDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete asset type', 'Deletes an asset type')
  remove(@Param('id') id: string) {
    return this.assetTypeService.remove(id);
  }
}
