import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GoodsAndServicesMappingService } from './goods_and_services_mapping.service';
import { CreateGoodsAndServicesMappingDto } from './dto/create-goods_and_services_mapping.dto';
import { UpdateGoodsAndServicesMappingDto } from './dto/update-goods_and_services_mapping.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';
import { GoodAndServiceMappingFilterType } from 'src/interfaces/good_and_service_mapping.interface';

@Controller('goods-and-services-mapping')
@ApiTags('Good & Service Mapping')
export class GoodsAndServicesMappingController {
  constructor(
    private readonly goodsAndServicesMappingService: GoodsAndServicesMappingService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create Good And Service Mapping')
  create(
    @Body() createGoodsAndServicesMappingDto: CreateGoodsAndServicesMappingDto,
  ) {
    return this.goodsAndServicesMappingService.create(
      createGoodsAndServicesMappingDto,
    );
  }

  @Get()
  @ApiProtectedEndpoint('Find All Good And Service Mapping')
  findAll(@Query() param: GoodAndServiceMappingFilterType) {
    return this.goodsAndServicesMappingService.findAll(param);
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one Good And Service Mapping')
  findOne(@Param('id') id: string) {
    return this.goodsAndServicesMappingService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Good And Service Mapping')
  update(
    @Param('id') id: string,
    @Body() updateGoodsAndServicesMappingDto: UpdateGoodsAndServicesMappingDto,
  ) {
    return this.goodsAndServicesMappingService.update(
      id,
      updateGoodsAndServicesMappingDto,
    );
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete Good And Service Mapping')
  remove(@Param('id') id: string) {
    return this.goodsAndServicesMappingService.remove(id);
  }
}
