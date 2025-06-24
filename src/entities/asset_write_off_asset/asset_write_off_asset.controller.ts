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
import { AssetWriteOffAssetService } from './asset_write_off_asset.service';
import { CreateAssetWriteOffAssetDto } from './dto/create-asset_write_off_asset.dto';
import { UpdateAssetWriteOffAssetDto } from './dto/update-asset_write_off_asset.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Asset Write Off Asset')
@Controller('asset-write-off-asset')
export class AssetWriteOffAssetController {
  constructor(
    private readonly assetWriteOffAssetService: AssetWriteOffAssetService,
  ) {}

  @Post()
  @ApiProtectedEndpoint(
    'Create asset write off asset',
    'Creates a new asset write off asset',
  )
  create(@Body() dto: CreateAssetWriteOffAssetDto) {
    return this.assetWriteOffAssetService.create(dto);
  }

  @Get()
  @ApiProtectedEndpoint(
    'Get all asset write off assets',
    'Returns all asset write off assets',
  )
  findAll() {
    return this.assetWriteOffAssetService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint(
    'Get asset write off asset by ID',
    'Returns a single asset write off asset by ID',
  )
  findOne(@Param('id') id: string) {
    return this.assetWriteOffAssetService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint(
    'Update asset write off asset',
    'Updates a single asset write off asset',
  )
  update(@Param('id') id: string, @Body() dto: UpdateAssetWriteOffAssetDto) {
    return this.assetWriteOffAssetService.update(id, dto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint(
    'Delete asset write off asset',
    'Soft deletes a single asset write off asset',
  )
  remove(@Param('id') id: string) {
    return this.assetWriteOffAssetService.remove(id);
  }
}
