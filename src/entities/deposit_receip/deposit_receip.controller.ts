import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DepositReceipService } from './deposit_receip.service';
import { CreateDepositReceipDto } from './dto/create-deposit_receip.dto';
import { UpdateDepositReceipDto } from './dto/update-deposit_receip.dto';
import { ApiBody, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('deposit-receip')
@ApiTags('DepositReceip')
@ApiExtraModels(CreateDepositReceipDto, UpdateDepositReceipDto)
export class DepositReceipController {
  constructor(private readonly depositReceipService: DepositReceipService) {}

  @Post()
  @ApiProtectedEndpoint('Create DepositReceip')
  @ApiBody({
    type: CreateDepositReceipDto,
    description:
      'Create a new deposit receipt with optional Base64 file attachment.',
  })
  create(@Body() createDepositReceipDto: CreateDepositReceipDto) {
    return this.depositReceipService.create(createDepositReceipDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all DepositReceip')
  findAll() {
    return this.depositReceipService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one DepositReceip')
  findOne(@Param('id') id: string) {
    return this.depositReceipService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update DepositReceip')
  update(
    @Param('id') id: string,
    @Body() updateDepositReceipDto: UpdateDepositReceipDto,
  ) {
    return this.depositReceipService.update(id, updateDepositReceipDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete DepositReceip')
  remove(@Param('id') id: string) {
    return this.depositReceipService.remove(id);
  }
}
