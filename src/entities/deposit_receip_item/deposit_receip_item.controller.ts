import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DepositReceipItemService } from './deposit_receip_item.service';
import { CreateDepositReceipItemDto } from './dto/create-deposit_receip_item.dto';
import { UpdateDepositReceipItemDto } from './dto/update-deposit_receip_item.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('deposit-receip-item')
@ApiTags('DepositReceipItem')
export class DepositReceipItemController {
  constructor(
    private readonly depositReceipItemService: DepositReceipItemService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create DepositReceipItem')
  create(@Body() createDepositReceipItemDto: CreateDepositReceipItemDto) {
    return this.depositReceipItemService.create(createDepositReceipItemDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all DepositReceipItem')
  findAll() {
    return this.depositReceipItemService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one DepositReceipItem')
  findOne(@Param('id') id: string) {
    return this.depositReceipItemService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update DepositReceipItem')
  update(
    @Param('id') id: string,
    @Body() updateDepositReceipItemDto: UpdateDepositReceipItemDto,
  ) {
    return this.depositReceipItemService.update(id, updateDepositReceipItemDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete DepositReceipItem')
  remove(@Param('id') id: string) {
    return this.depositReceipItemService.remove(id);
  }
}
