import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupOfPurchaseGoodService } from './group_of_purchase_good.service';
import { CreateGroupOfPurchaseGoodDto } from './dto/create-group_of_purchase_good.dto';
import { UpdateGroupOfPurchaseGoodDto } from './dto/update-group_of_purchase_good.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('group-of-purchase-good')
@ApiTags('GroupOfPurchaseGood')
export class GroupOfPurchaseGoodController {
  constructor(
    private readonly groupOfPurchaseGoodService: GroupOfPurchaseGoodService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create GroupOfPurchaseGood')
  create(@Body() createGroupOfPurchaseGoodDto: CreateGroupOfPurchaseGoodDto) {
    return this.groupOfPurchaseGoodService.create(createGroupOfPurchaseGoodDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all GroupOfPurchaseGood')
  findAll() {
    return this.groupOfPurchaseGoodService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one GroupOfPurchaseGood')
  findOne(@Param('id') id: string) {
    return this.groupOfPurchaseGoodService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update GroupOfPurchaseGood')
  update(
    @Param('id') id: string,
    @Body() updateGroupOfPurchaseGoodDto: UpdateGroupOfPurchaseGoodDto,
  ) {
    return this.groupOfPurchaseGoodService.update(
      id,
      updateGroupOfPurchaseGoodDto,
    );
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete GroupOfPurchaseGood')
  remove(@Param('id') id: string) {
    return this.groupOfPurchaseGoodService.remove(id);
  }
}
