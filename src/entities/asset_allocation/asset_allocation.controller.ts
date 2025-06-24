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
import { AssetAllocationService } from './asset_allocation.service';
import { CreateAssetAllocationDto } from './dto/create-asset_allocation.dto';
import { UpdateAssetAllocationDto } from './dto/update-asset_allocation.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Asset Allocation')
@Controller('asset-allocation')
export class AssetAllocationController {
  constructor(
    private readonly assetAllocationService: AssetAllocationService,
  ) {}

  @Post()
  @ApiProtectedEndpoint(
    'Create asset allocation',
    'Creates a new asset allocation',
  )
  create(@Body() dto: CreateAssetAllocationDto) {
    return this.assetAllocationService.create(dto);
  }

  @Get()
  @ApiProtectedEndpoint(
    'Get all asset allocations',
    'Returns all asset allocations',
  )
  findAll() {
    return this.assetAllocationService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint(
    'Get asset allocation by ID',
    'Returns a single asset allocation by ID',
  )
  findOne(@Param('id') id: string) {
    return this.assetAllocationService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint(
    'Update asset allocation',
    'Updates a single asset allocation',
  )
  update(@Param('id') id: string, @Body() dto: UpdateAssetAllocationDto) {
    return this.assetAllocationService.update(id, dto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint(
    'Delete asset allocation',
    'Soft deletes a single asset allocation',
  )
  remove(@Param('id') id: string) {
    return this.assetAllocationService.remove(id);
  }
}
