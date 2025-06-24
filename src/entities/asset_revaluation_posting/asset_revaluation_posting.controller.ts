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
import { AssetRevaluationPostingService } from './asset_revaluation_posting.service';
import { CreateAssetRevaluationPostingDto } from './dto/create-asset_revaluation_posting.dto';
import { UpdateAssetRevaluationPostingDto } from './dto/update-asset_revaluation_posting.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Asset Revaluation Posting')
@Controller('asset-revaluation-posting')
export class AssetRevaluationPostingController {
  constructor(
    private readonly assetRevaluationPostingService: AssetRevaluationPostingService,
  ) {}

  @Post()
  @ApiProtectedEndpoint(
    'Create asset revaluation posting',
    'Creates a new asset revaluation posting',
  )
  create(@Body() dto: CreateAssetRevaluationPostingDto) {
    return this.assetRevaluationPostingService.create(dto);
  }

  @Get()
  @ApiProtectedEndpoint(
    'Get all asset revaluation postings',
    'Returns all asset revaluation postings',
  )
  findAll() {
    return this.assetRevaluationPostingService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint(
    'Get asset revaluation posting by ID',
    'Returns a single asset revaluation posting by ID',
  )
  findOne(@Param('id') id: string) {
    return this.assetRevaluationPostingService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint(
    'Update asset revaluation posting',
    'Updates a single asset revaluation posting',
  )
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAssetRevaluationPostingDto,
  ) {
    return this.assetRevaluationPostingService.update(id, dto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint(
    'Delete asset revaluation posting',
    'Soft deletes a single asset revaluation posting',
  )
  remove(@Param('id') id: string) {
    return this.assetRevaluationPostingService.remove(id);
  }
}
