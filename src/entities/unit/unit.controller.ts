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
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { UnitFilterType } from 'src/interfaces/unit.interface';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Units')
@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  @ApiProtectedEndpoint('Create Unit')
  create(@Body() createUnitDto: CreateUnitDto) {
    return this.unitService.create(createUnitDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find All Unit')
  findAll(@Query() param: UnitFilterType) {
    return this.unitService.findAll(param);
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find Unit by ID')
  findOne(@Param('id') id: string) {
    return this.unitService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Unit')
  update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto) {
    return this.unitService.update(id, updateUnitDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete Unit')
  remove(@Param('id') id: string) {
    return this.unitService.remove(id);
  }
}
