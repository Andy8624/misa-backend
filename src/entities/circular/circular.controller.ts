import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'; // Import ApiTags
import { CircularService } from './circular.service';
import { CreateCircularDto } from './dto/create-circular.dto';
import { UpdateCircularDto } from './dto/update-circular.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator'; // Import custom decorator

@ApiTags('Circular') // Thêm tag cho Swagger UI
@Controller('circular')
export class CircularController {
  constructor(private readonly circularService: CircularService) {}

  @Post()
  @ApiProtectedEndpoint('Create circular', 'Creates a new circular record')
  create(@Body() createCircularDto: CreateCircularDto) {
    return this.circularService.create(createCircularDto);
  }

  @Get()
  @ApiProtectedEndpoint('Get all circulars', 'Returns all circular records')
  findAll() {
    return this.circularService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint(
    'Get circular by ID',
    'Returns a single circular record by ID',
  )
  findOne(@Param('id') id: string) {
    // ID trong Prisma thường là string (UUID), không cần chuyển đổi sang số
    return this.circularService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint(
    'Update circular',
    'Updates an existing circular record by ID',
  )
  update(
    @Param('id') id: string,
    @Body() updateCircularDto: UpdateCircularDto,
  ) {
    // ID trong Prisma thường là string (UUID), không cần chuyển đổi sang số
    return this.circularService.update(id, updateCircularDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint(
    'Delete circular',
    'Soft deletes a circular record by ID',
  )
  remove(@Param('id') id: string) {
    // ID trong Prisma thường là string (UUID), không cần chuyển đổi sang số
    return this.circularService.remove(id);
  }
}
