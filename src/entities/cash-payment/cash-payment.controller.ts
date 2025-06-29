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
import { CashPaymentService } from './cash-payment.service';
import { CreateCashPaymentDto } from './dto/create-cash-payment.dto';
import { UpdateCashPaymentDto } from './dto/update-cash-payment.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';
import { ApiFileWithBody } from 'src/config/custom-decorator/file.decorator';

@Controller('cash-payment')
@ApiTags('CashPayment')
@ApiExtraModels(CreateCashPaymentDto, UpdateCashPaymentDto)
export class CashPaymentController {
  constructor(private readonly cashPaymentService: CashPaymentService) {}

  @Post()
  @ApiProtectedEndpoint('Create CashPayment')
  @ApiFileWithBody('file') // Use your custom decorator for file upload
  @ApiBody({
    schema: {
      type: 'object',
      allOf: [
        // 1. Reference the schema of CreateCashPaymentDto
        { $ref: getSchemaPath(CreateCashPaymentDto) },
        // 2. Add the 'file' property, which is not part of the DTO object itself
        {
          properties: {
            file: {
              type: 'string',
              format: 'binary',
              description: 'The attached file for the cash payment.',
            },
          },
        },
      ],
      // 'file' is required, and 'companyId' is required (and also validated by @IsNotEmpty() in DTO)
      required: ['file', 'companyId'],
    },
  })
  create(
    @Body() createCashPaymentDto: CreateCashPaymentDto,
    @UploadedFile() file: Express.Multer.File, // Expect the file here
  ) {
    return this.cashPaymentService.create(createCashPaymentDto, file);
  }

  @Get()
  @ApiProtectedEndpoint('Find All CashPayment')
  findAll() {
    return this.cashPaymentService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one CashPayment')
  findOne(@Param('id') id: string) {
    return this.cashPaymentService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update CashPayment')
  update(
    @Param('id') id: string,
    @Body() updateCashPaymentDto: UpdateCashPaymentDto,
  ) {
    return this.cashPaymentService.update(id, updateCashPaymentDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete CashPayment')
  remove(@Param('id') id: string) {
    return this.cashPaymentService.remove(id);
  }
}
