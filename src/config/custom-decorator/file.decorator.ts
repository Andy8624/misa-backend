// src/common/decorators/api-file-with-body.decorator.ts
import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiConsumes } from '@nestjs/swagger';

// Decorator này chỉ lo phần Multer và chỉ định Content-Type
export function ApiFileWithBody(fieldName = 'file') {
  return applyDecorators(
    ApiConsumes('multipart/form-data'), // Chỉ ra rằng API này nhận dữ liệu dạng form-data
    UseInterceptors(
      FileInterceptor(fieldName, {
        storage: diskStorage({
          destination: './uploads/temp', // Thư mục tạm thời
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
    ),
  );
}
