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
import { WarrantyPeriodService } from './warranty_period.service';
import { CreateWarrantyPeriodDto } from './dto/create-warranty_period.dto';
import { UpdateWarrantyPeriodDto } from './dto/update-warranty_period.dto';
import { WarrantyPeriodFilterType } from 'src/interfaces/warranty_period.interface';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('warranty-period')
@ApiTags('Warranty Period')
export class WarrantyPeriodController {
  constructor(private readonly warrantyPeriodService: WarrantyPeriodService) {}

  @Post()
  @ApiProtectedEndpoint('Create Warranty Period')
  create(@Body() createWarrantyPeriodDto: CreateWarrantyPeriodDto) {
    return this.warrantyPeriodService.create(createWarrantyPeriodDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find All Warranty Period')
  findAll(@Query() param: WarrantyPeriodFilterType) {
    return this.warrantyPeriodService.findAll(param);
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one Warranty Period')
  findOne(@Param('id') id: string) {
    return this.warrantyPeriodService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Warranty Period')
  update(
    @Param('id') id: string,
    @Body() updateWarrantyPeriodDto: UpdateWarrantyPeriodDto,
  ) {
    return this.warrantyPeriodService.update(id, updateWarrantyPeriodDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete Warranty Period')
  remove(@Param('id') id: string) {
    return this.warrantyPeriodService.remove(id);
  }
}
