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
import { AssetFormationOriginService } from './asset_formation_origin.service';
import { CreateAssetFormationOriginDto } from './dto/create-asset_formation_origin.dto';
import { UpdateAssetFormationOriginDto } from './dto/update-asset_formation_origin.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Asset Formation Origin')
@Controller('asset-formation-origin')
export class AssetFormationOriginController {
  constructor(
    private readonly assetFormationOriginService: AssetFormationOriginService,
  ) {}

  @Post()
  @ApiProtectedEndpoint(
    'Create asset formation origin',
    'Creates a new asset formation origin',
  )
  create(@Body() dto: CreateAssetFormationOriginDto) {
    return this.assetFormationOriginService.create(dto);
  }

  @Get()
  @ApiProtectedEndpoint(
    'Get all asset formation origins',
    'Returns all asset formation origins',
  )
  findAll() {
    return this.assetFormationOriginService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint(
    'Get asset formation origin by ID',
    'Returns a single asset formation origin by ID',
  )
  findOne(@Param('id') id: string) {
    return this.assetFormationOriginService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint(
    'Update asset formation origin',
    'Updates a single asset formation origin',
  )
  update(@Param('id') id: string, @Body() dto: UpdateAssetFormationOriginDto) {
    return this.assetFormationOriginService.update(id, dto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint(
    'Delete asset formation origin',
    'Soft deletes a single asset formation origin',
  )
  remove(@Param('id') id: string) {
    return this.assetFormationOriginService.remove(id);
  }
}
