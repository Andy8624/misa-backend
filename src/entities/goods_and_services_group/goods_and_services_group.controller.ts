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
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';
import { GoodAndServiceGroupFilterType } from 'src/interfaces/good_and_service_group.interface';

@ApiTags('Goods & Services Group')
@Controller('goods-and-services-groups')
export class GoodsAndServicesGroupController {
  constructor(
    private readonly goodsAndServicesGroupService: GoodsAndServicesGroupService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create Good And Service Group')
  create(
    @Body() createGoodsAndServicesGroupDto: CreateGoodsAndServicesGroupDto,
  ) {
    return this.goodsAndServicesGroupService.create(
      createGoodsAndServicesGroupDto,
    );
  }

  @Get()
  @ApiProtectedEndpoint('Find All Good And Service Group')
  findAll(@Query() param: GoodAndServiceGroupFilterType) {
    return this.goodsAndServicesGroupService.findAll(param);
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find Good And Service Group by ID')
  findOne(@Param('id') id: string) {
    return this.goodsAndServicesGroupService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Good And Service Group')
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
  @ApiProtectedEndpoint('Delete Good And Service Group')
  remove(@Param('id') id: string) {
    return this.goodsAndServicesGroupService.remove(id);
  }
}
