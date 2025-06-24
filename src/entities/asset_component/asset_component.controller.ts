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
import { AssetComponentService } from './asset_component.service';
import { CreateAssetComponentDto } from './dto/create-asset_component.dto';
import { UpdateAssetComponentDto } from './dto/update-asset_component.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Asset Component')
@Controller('asset-component')
export class AssetComponentController {
  constructor(private readonly assetComponentService: AssetComponentService) {}

  @Post()
  @ApiProtectedEndpoint(
    'Create asset component',
    'Creates a new asset component',
  )
  create(@Body() dto: CreateAssetComponentDto) {
    return this.assetComponentService.create(dto);
  }

  @Get()
  @ApiProtectedEndpoint(
    'Get all asset components',
    'Returns all asset components',
  )
  findAll() {
    return this.assetComponentService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint(
    'Get asset component by ID',
    'Returns a single asset component by ID',
  )
  findOne(@Param('id') id: string) {
    return this.assetComponentService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint(
    'Update asset component',
    'Updates a single asset component',
  )
  update(@Param('id') id: string, @Body() dto: UpdateAssetComponentDto) {
    return this.assetComponentService.update(id, dto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint(
    'Delete asset component',
    'Soft deletes a single asset component',
  )
  remove(@Param('id') id: string) {
    return this.assetComponentService.remove(id);
  }
}
