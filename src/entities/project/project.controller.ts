import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('project')
@ApiTags('Project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiProtectedEndpoint('Create Project')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all Project')
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one Project')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Project')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete Project')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
