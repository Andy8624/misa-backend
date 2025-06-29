import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
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
      },
      required: ['file', 'companyId'],
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/temp',
        filename: (req, file, callback) => {
          const timestamp = Date.now();

          const safeOriginalName = file.originalname.replace(
            /[^a-zA-Z0-9.\-_]/g,
            '_',
          );
          callback(null, `${timestamp}-${safeOriginalName}`);
        },
      }),
    }),
  )
  UploadedFileInfo(
    @UploadedFile() file: Express.Multer.File,
    @Body('companyId') companyId: string,
  ) {
    return this.fileService.uploadFile(file, companyId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Indicate successful deletion with 204 No Content
  @ApiProtectedEndpoint('Delete File') // Apply your authentication/authorization decorator
  @ApiOperation({ summary: 'Delete a file by its ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the file to delete (from your database)',
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'File successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request or file not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access.',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden access.',
  })
  async deleteFile(@Param('id') fileId: string): Promise<void> {
    await this.fileService.deleteFile(fileId);
  }
}
