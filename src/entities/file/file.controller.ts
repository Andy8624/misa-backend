import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('files')
@ApiTags('Files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @ApiProtectedEndpoint('Upload file to Directus and link to related record')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        companyId: {
          type: 'string',
          description: 'ID of the company uploading this file',
        },
        // relatedType: {
        //   type: 'string',
        //   description:
        //     'Type of record this file is attached to (e.g. inventory_in, invoice)',
        //   example: 'inventory_in',
        // },
        // relatedId: {
        //   type: 'string',
        //   description: 'ID of the related record (e.g. inventory record ID)',
        //   example: 'inv_abc123',
        // },
      },
      required: ['file', 'companyId'],
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/temp',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('companyId') companyId: string,
    // @Body('relatedType') relatedType: string,
    // @Body('relatedId') relatedId: string,
  ) {
    return this.fileService.uploadFile(file, companyId);
  }
}
