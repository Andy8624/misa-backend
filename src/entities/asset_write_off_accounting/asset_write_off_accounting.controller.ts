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
import { AssetWriteOffAccountingService } from './asset_write_off_accounting.service';
import { CreateAssetWriteOffAccountingDto } from './dto/create-asset_write_off_accounting.dto';
import { UpdateAssetWriteOffAccountingDto } from './dto/update-asset_write_off_accounting.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Asset Write Off Accounting')
@Controller('asset-write-off-accounting')
export class AssetWriteOffAccountingController {
  constructor(
    private readonly assetWriteOffAccountingService: AssetWriteOffAccountingService,
  ) {}

  @Post()
  @ApiProtectedEndpoint(
    'Create asset write off accounting',
    'Creates a new asset write off accounting',
  )
  create(@Body() dto: CreateAssetWriteOffAccountingDto) {
    return this.assetWriteOffAccountingService.create(dto);
  }

  @Get()
  @ApiProtectedEndpoint(
    'Get all asset write off accountings',
    'Returns all asset write off accountings',
  )
  findAll() {
    return this.assetWriteOffAccountingService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint(
    'Get asset write off accounting by ID',
    'Returns a single asset write off accounting by ID',
  )
  findOne(@Param('id') id: string) {
    return this.assetWriteOffAccountingService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint(
    'Update asset write off accounting',
    'Updates a single asset write off accounting',
  )
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAssetWriteOffAccountingDto,
  ) {
    return this.assetWriteOffAccountingService.update(id, dto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint(
    'Delete asset write off accounting',
    'Soft deletes a single asset write off accounting',
  )
  remove(@Param('id') id: string) {
    return this.assetWriteOffAccountingService.remove(id);
  }
}
