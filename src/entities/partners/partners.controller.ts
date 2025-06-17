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
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PartnerFilterType } from 'src/interfaces/partner.interface';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Partners')
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  @ApiProtectedEndpoint('Create Partner')
  create(@Body() createPartnerDto: CreatePartnerDto) {
    return this.partnersService.create(createPartnerDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find All Partner')
  findAll(@Query() param: PartnerFilterType) {
    return this.partnersService.findAll(param);
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find Partner by ID')
  findOne(@Param('id') id: string) {
    return this.partnersService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Partner')
  update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
    console.log('Partner ID', id);
    console.log('Partner request', updatePartnerDto);
    return this.partnersService.update(id, updatePartnerDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete Partner')
  remove(@Param('id') id: string) {
    return this.partnersService.remove(id);
  }
}
