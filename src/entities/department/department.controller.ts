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
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @ApiProtectedEndpoint('Create department', 'Creates a new department')
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  @ApiProtectedEndpoint(
    'Get all departments',
    'Returns a list of all departments',
  )
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint(
    'Get department by ID',
    'Returns a single department by ID',
  )
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update department', 'Updates an existing department')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete department', 'Deletes a department')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(id);
  }
}
