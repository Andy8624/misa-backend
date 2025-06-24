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
import { AssetIncrementService } from './asset_increment.service';
import { CreateAssetIncrementDto } from './dto/create-asset_increment.dto';
import { UpdateAssetIncrementDto } from './dto/update-asset_increment.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Asset Increment')
@Controller('asset-increment')
export class AssetIncrementController {
  constructor(private readonly assetIncrementService: AssetIncrementService) {}

  @Post()
  @ApiProtectedEndpoint(
    'Create asset increment',
    'Creates a new asset increment',
  )
  create(@Body() dto: CreateAssetIncrementDto) {
    return this.assetIncrementService.create(dto);
  }

  @Get()
  @ApiProtectedEndpoint(
    'Get all asset increments',
    'Returns all asset increments',
  )
  findAll() {
    return this.assetIncrementService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint(
    'Get asset increment by ID',
    'Returns a single asset increment by ID',
  )
  findOne(@Param('id') id: string) {
    return this.assetIncrementService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint(
    'Update asset increment',
    'Updates a single asset increment',
  )
  update(@Param('id') id: string, @Body() dto: UpdateAssetIncrementDto) {
    return this.assetIncrementService.update(id, dto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint(
    'Delete asset increment',
    'Soft deletes a single asset increment',
  )
  remove(@Param('id') id: string) {
    return this.assetIncrementService.remove(id);
  }
}
