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
import { GoodsAndServicesGroupService } from './goods_and_services_group.service';
import { CreateGoodsAndServicesGroupDto } from './dto/create-goods_and_services_group.dto';
import { UpdateGoodsAndServicesGroupDto } from './dto/update-goods_and_services_group.dto';
import { GoodAndServiceGroupFilterType } from 'src/interfaces/good_and_service_group.interface';

@Controller('goods-and-services-groups')
export class GoodsAndServicesGroupController {
  constructor(
    private readonly goodsAndServicesGroupService: GoodsAndServicesGroupService,
  ) {}

  @Post()
  create(
    @Body() createGoodsAndServicesGroupDto: CreateGoodsAndServicesGroupDto,
  ) {
    return this.goodsAndServicesGroupService.create(
      createGoodsAndServicesGroupDto,
    );
  }

  @Get()
  findAll(@Query() param: GoodAndServiceGroupFilterType) {
    return this.goodsAndServicesGroupService.findAll(param);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goodsAndServicesGroupService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGoodsAndServicesGroupDto: UpdateGoodsAndServicesGroupDto,
  ) {
    return this.goodsAndServicesGroupService.update(
      id,
      updateGoodsAndServicesGroupDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goodsAndServicesGroupService.remove(id);
  }
}
