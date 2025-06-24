import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectService } from './object.service';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Object')
@Controller('object')
export class ObjectController {
  constructor(private readonly objectService: ObjectService) {}

  @Post()
  @ApiProtectedEndpoint('Create object', 'Creates a new object')
  create(@Body() dto: CreateObjectDto) {
    return this.objectService.create(dto);
  }

  @Get()
  @ApiProtectedEndpoint('Get all objects', 'Returns all objects')
  findAll() {
    return this.objectService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Get object by ID', 'Returns a single object by ID')
  findOne(@Param('id') id: string) {
    return this.objectService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update object', 'Updates a single object')
  update(@Param('id') id: string, @Body() dto: UpdateObjectDto) {
    return this.objectService.update(id, dto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete object', 'Soft deletes a single object')
  remove(@Param('id') id: string) {
    return this.objectService.remove(id);
  }
}
