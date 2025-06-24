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
import { AssetTransferService } from './asset_transfer.service';
import { CreateAssetTransferDto } from './dto/create-asset_transfer.dto';
import { UpdateAssetTransferDto } from './dto/update-asset_transfer.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Asset Transfer')
@Controller('asset-transfer')
export class AssetTransferController {
  constructor(private readonly assetTransferService: AssetTransferService) {}

  @Post()
  @ApiProtectedEndpoint('Create asset transfer', 'Creates a new asset transfer')
  create(@Body() createAssetTransferDto: CreateAssetTransferDto) {
    return this.assetTransferService.create(createAssetTransferDto);
  }

  @Get()
  @ApiProtectedEndpoint(
    'Get all asset transfers',
    'Returns a list of all asset transfers',
  )
  findAll() {
    return this.assetTransferService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint(
    'Get asset transfer by ID',
    'Returns a single asset transfer by ID',
  )
  findOne(@Param('id') id: string) {
    return this.assetTransferService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint(
    'Update asset transfer',
    'Updates an existing asset transfer',
  )
  update(
    @Param('id') id: string,
    @Body() updateAssetTransferDto: UpdateAssetTransferDto,
  ) {
    return this.assetTransferService.update(id, updateAssetTransferDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete asset transfer', 'Deletes an asset transfer')
  remove(@Param('id') id: string) {
    return this.assetTransferService.remove(id);
  }
}
