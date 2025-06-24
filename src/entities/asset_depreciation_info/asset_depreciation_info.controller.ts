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
import { AssetDepreciationInfoService } from './asset_depreciation_info.service';
import { CreateAssetDepreciationInfoDto } from './dto/create-asset_depreciation_info.dto';
import { UpdateAssetDepreciationInfoDto } from './dto/update-asset_depreciation_info.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Asset Depreciation Info')
@Controller('asset-depreciation-info')
export class AssetDepreciationInfoController {
  constructor(
    private readonly assetDepreciationInfoService: AssetDepreciationInfoService,
  ) {}

  @Post()
  @ApiProtectedEndpoint(
    'Create asset depreciation info',
    'Creates a new asset depreciation info',
  )
  create(@Body() dto: CreateAssetDepreciationInfoDto) {
    return this.assetDepreciationInfoService.create(dto);
  }

  @Get()
  @ApiProtectedEndpoint(
    'Get all asset depreciation info',
    'Returns all asset depreciation info records',
  )
  findAll() {
    return this.assetDepreciationInfoService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint(
    'Get asset depreciation info by ID',
    'Returns a single asset depreciation info by ID',
  )
  findOne(@Param('id') id: string) {
    return this.assetDepreciationInfoService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint(
    'Update asset depreciation info',
    'Updates a single asset depreciation info record',
  )
  update(@Param('id') id: string, @Body() dto: UpdateAssetDepreciationInfoDto) {
    return this.assetDepreciationInfoService.update(id, dto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint(
    'Delete asset depreciation info',
    'Soft deletes a single asset depreciation info record',
  )
  remove(@Param('id') id: string) {
    return this.assetDepreciationInfoService.remove(id);
  }
}
