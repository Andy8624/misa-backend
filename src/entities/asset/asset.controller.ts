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
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Asset')
@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  @ApiProtectedEndpoint('Create asset', 'Creates a new asset')
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetService.create(createAssetDto);
  }

  @Get()
  @ApiProtectedEndpoint('Get all assets', 'Returns a list of all assets')
  findAll() {
    return this.assetService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Get asset by ID', 'Returns a single asset by ID')
  findOne(@Param('id') id: string) {
    return this.assetService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update asset', 'Updates an existing asset')
  update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetService.update(id, updateAssetDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete asset', 'Deletes an asset')
  remove(@Param('id') id: string) {
    return this.assetService.remove(id);
  }
}
