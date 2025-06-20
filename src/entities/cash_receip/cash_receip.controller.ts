import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CashReceipService } from './cash_receip.service';
import { CreateCashReceipDto } from './dto/create-cash_receip.dto';
import { UpdateCashReceipDto } from './dto/update-cash_receip.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('cash-receip')
@ApiTags('CashReceip')
export class CashReceipController {
  constructor(private readonly cashReceipService: CashReceipService) {}

  @Post()
  @ApiProtectedEndpoint('Create CashReceip')
  create(@Body() createCashReceipDto: CreateCashReceipDto) {
    return this.cashReceipService.create(createCashReceipDto);
  }

  @Get()
  @ApiProtectedEndpoint('Findall CashReceip')
  findAll() {
    return this.cashReceipService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Findone CashReceip')
  findOne(@Param('id') id: string) {
    return this.cashReceipService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update CashReceip')
  update(
    @Param('id') id: string,
    @Body() updateCashReceipDto: UpdateCashReceipDto,
  ) {
    return this.cashReceipService.update(id, updateCashReceipDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete CashReceip')
  remove(@Param('id') id: string) {
    return this.cashReceipService.remove(id);
  }
}
