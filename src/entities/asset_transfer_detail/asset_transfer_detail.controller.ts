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
import { AssetTransferDetailService } from './asset_transfer_detail.service';
import { CreateAssetTransferDetailDto } from './dto/create-asset_transfer_detail.dto';
import { UpdateAssetTransferDetailDto } from './dto/update-asset_transfer_detail.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Asset Transfer Detail')
@Controller('asset-transfer-detail')
export class AssetTransferDetailController {
  constructor(
    private readonly assetTransferDetailService: AssetTransferDetailService,
  ) {}

  @Post()
  @ApiProtectedEndpoint(
    'Create asset transfer detail',
    'Creates a new asset transfer detail',
  )
  create(@Body() dto: CreateAssetTransferDetailDto) {
    return this.assetTransferDetailService.create(dto);
  }

  @Get()
  @ApiProtectedEndpoint(
    'Get all asset transfer details',
    'Returns all asset transfer details',
  )
  findAll() {
    return this.assetTransferDetailService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint(
    'Get asset transfer detail by ID',
    'Returns a single asset transfer detail by ID',
  )
  findOne(@Param('id') id: string) {
    return this.assetTransferDetailService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint(
    'Update asset transfer detail',
    'Updates a single asset transfer detail',
  )
  update(@Param('id') id: string, @Body() dto: UpdateAssetTransferDetailDto) {
    return this.assetTransferDetailService.update(id, dto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint(
    'Delete asset transfer detail',
    'Soft deletes a single asset transfer detail',
  )
  remove(@Param('id') id: string) {
    return this.assetTransferDetailService.remove(id);
  }
}
