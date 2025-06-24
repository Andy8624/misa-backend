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
import { AssetWriteOffService } from './asset_write_off.service';
import { CreateAssetWriteOffDto } from './dto/create-asset_write_off.dto';
import { UpdateAssetWriteOffDto } from './dto/update-asset_write_off.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Asset Write Off')
@Controller('asset-write-off')
export class AssetWriteOffController {
  constructor(private readonly assetWriteOffService: AssetWriteOffService) {}

  @Post()
  @ApiProtectedEndpoint(
    'Create asset write off',
    'Creates a new asset write off',
  )
  create(@Body() dto: CreateAssetWriteOffDto) {
    return this.assetWriteOffService.create(dto);
  }

  @Get()
  @ApiProtectedEndpoint(
    'Get all asset write offs',
    'Returns all asset write offs',
  )
  findAll() {
    return this.assetWriteOffService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint(
    'Get asset write off by ID',
    'Returns a single asset write off by ID',
  )
  findOne(@Param('id') id: string) {
    return this.assetWriteOffService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint(
    'Update asset write off',
    'Updates a single asset write off',
  )
  update(@Param('id') id: string, @Body() dto: UpdateAssetWriteOffDto) {
    return this.assetWriteOffService.update(id, dto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint(
    'Delete asset write off',
    'Soft deletes a single asset write off',
  )
  remove(@Param('id') id: string) {
    return this.assetWriteOffService.remove(id);
  }
}
