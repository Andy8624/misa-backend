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
import { AssetRevaluationService } from './asset_revaluation.service';
import { CreateAssetRevaluationDto } from './dto/create-asset_revaluation.dto';
import { UpdateAssetRevaluationDto } from './dto/update-asset_revaluation.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Asset Revaluation')
@Controller('asset-revaluation')
export class AssetRevaluationController {
  constructor(
    private readonly assetRevaluationService: AssetRevaluationService,
  ) {}

  @Post()
  @ApiProtectedEndpoint(
    'Create asset revaluation',
    'Creates a new asset revaluation',
  )
  create(@Body() dto: CreateAssetRevaluationDto) {
    return this.assetRevaluationService.create(dto);
  }

  @Get()
  @ApiProtectedEndpoint(
    'Get all asset revaluations',
    'Returns all asset revaluations',
  )
  findAll() {
    return this.assetRevaluationService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint(
    'Get asset revaluation by ID',
    'Returns a single asset revaluation by ID',
  )
  findOne(@Param('id') id: string) {
    return this.assetRevaluationService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint(
    'Update asset revaluation',
    'Updates a single asset revaluation',
  )
  update(@Param('id') id: string, @Body() dto: UpdateAssetRevaluationDto) {
    return this.assetRevaluationService.update(id, dto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint(
    'Delete asset revaluation',
    'Soft deletes a single asset revaluation',
  )
  remove(@Param('id') id: string) {
    return this.assetRevaluationService.remove(id);
  }
}
