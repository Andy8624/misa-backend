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
import { AssetRevaluationDetailService } from './asset_revaluation_detail.service';
import { CreateAssetRevaluationDetailDto } from './dto/create-asset_revaluation_detail.dto';
import { UpdateAssetRevaluationDetailDto } from './dto/update-asset_revaluation_detail.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Asset Revaluation Detail')
@Controller('asset-revaluation-detail')
export class AssetRevaluationDetailController {
  constructor(
    private readonly assetRevaluationDetailService: AssetRevaluationDetailService,
  ) {}

  @Post()
  @ApiProtectedEndpoint(
    'Create asset revaluation detail',
    'Creates a new asset revaluation detail',
  )
  create(@Body() dto: CreateAssetRevaluationDetailDto) {
    return this.assetRevaluationDetailService.create(dto);
  }

  @Get()
  @ApiProtectedEndpoint(
    'Get all asset revaluation details',
    'Returns all asset revaluation details',
  )
  findAll() {
    return this.assetRevaluationDetailService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint(
    'Get asset revaluation detail by ID',
    'Returns a single asset revaluation detail by ID',
  )
  findOne(@Param('id') id: string) {
    return this.assetRevaluationDetailService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint(
    'Update asset revaluation detail',
    'Updates a single asset revaluation detail',
  )
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAssetRevaluationDetailDto,
  ) {
    return this.assetRevaluationDetailService.update(id, dto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint(
    'Delete asset revaluation detail',
    'Soft deletes a single asset revaluation detail',
  )
  remove(@Param('id') id: string) {
    return this.assetRevaluationDetailService.remove(id);
  }
}
