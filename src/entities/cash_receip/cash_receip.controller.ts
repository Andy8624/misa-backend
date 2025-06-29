import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
} from '@nestjs/common';
import { CashReceipService } from './cash_receip.service';
import { CreateCashReceipDto } from './dto/create-cash_receip.dto';
import { UpdateCashReceipDto } from './dto/update-cash_receip.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';
import { ApiFileWithBody } from 'src/config/custom-decorator/file.decorator';

@Controller('cash-receip')
@ApiTags('CashReceip')
@ApiExtraModels(CreateCashReceipDto, UpdateCashReceipDto)
export class CashReceipController {
  constructor(private readonly cashReceipService: CashReceipService) {}

  @Post()
  @ApiProtectedEndpoint('Create CashReceip')
  @ApiFileWithBody('file')
  @ApiBody({
    schema: {
      type: 'object',
      allOf: [
        // 1. Tham chiếu đến schema của CreateCashReceipDto
        { $ref: getSchemaPath(CreateCashReceipDto) },
        // 2. Thêm các thuộc tính bổ sung không có trong DTO (như 'file')
        {
          properties: {
            file: {
              type: 'string',
              format: 'binary',
              description: 'Tệp đính kèm cho phiếu thu.',
            },
          },
        },
      ],
      required: ['file'],
    },
  })
  create(
    @Body() createCashReceipDto: CreateCashReceipDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.cashReceipService.create(createCashReceipDto, file);
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
