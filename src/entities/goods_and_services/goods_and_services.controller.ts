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
import { GoodsAndServicesService } from './goods_and_services.service';
import { CreateGoodsAndServiceDto } from './dto/create-goods_and_service.dto';
import { UpdateGoodsAndServiceDto } from './dto/update-goods_and_service.dto';
import { GoodAndServiceFilterType } from 'src/interfaces/good_and_service.interface';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('goods-and-services')
@ApiTags('Goods & Services')
export class GoodsAndServicesController {
  constructor(
    private readonly goodsAndServicesService: GoodsAndServicesService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create Goods And Services')
  create(@Body() createGoodsAndServiceDto: CreateGoodsAndServiceDto) {
    return this.goodsAndServicesService.create(createGoodsAndServiceDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find All Goods And Services')
  findAll(@Query() param: GoodAndServiceFilterType) {
    return this.goodsAndServicesService.findAll(param);
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find Goods And Services by ID')
  findOne(@Param('id') id: string) {
    return this.goodsAndServicesService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Goods And Services')
  update(
    @Param('id') id: string,
    @Body() updateGoodsAndServiceDto: UpdateGoodsAndServiceDto,
  ) {
    return this.goodsAndServicesService.update(id, updateGoodsAndServiceDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete Goods And Services')
  remove(@Param('id') id: string) {
    return this.goodsAndServicesService.remove(id);
  }
}
