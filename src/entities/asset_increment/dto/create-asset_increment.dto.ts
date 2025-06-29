import { Expose, Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsUUID,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { imageBase64 } from 'src/constants/base64-example'; // Giả định bạn vẫn muốn dùng ví dụ Base64 này

export class CreateAssetIncrementDto {
  @ApiProperty({
    description: 'Voucher number for the asset increment.',
    example: 'GHI-TANG-001-2025',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucherNumber?: string;

  @ApiProperty({
    description: 'Date when the asset increment occurred (ISO 8601).',
    example: '2025-06-29T10:00:00.000Z',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @Expose()
  @Transform(({ value }) =>
    value instanceof Date ? value.toISOString() : value,
  )
  @IsOptional()
  @IsDateString()
  incrementDate?: Date;

  @ApiProperty({
    description: 'Type of the asset (e.g., "Tangible", "Intangible").',
    example: 'Tangible',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  assetType?: string;

  @ApiProperty({
    description: 'Unique code for the asset.',
    example: 'TSCD-LAPTOP-001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  assetCode?: string;

  @ApiProperty({
    description: 'Name of the asset.',
    example: 'Laptop Dell XPS 15',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  assetName?: string;

  @ApiProperty({
    description: 'Indicates if the asset is depreciable.',
    example: true,
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsBoolean()
  isDepreciable?: boolean;

  @ApiProperty({
    description: 'ID of the department using the asset.',
    example: 'a13d79c2-5f04-41dc-ab89-f397d775f2cc',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  departmentId?: string;

  @ApiProperty({
    description: 'ID of the company associated with the asset increment.',
    example: 'aeb395e2-5faf-44b0-8769-8aea89513612',
    required: false, // Model cho phép companyId là String?, nên đây là Optional
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  companyId?: string;

  @ApiProperty({
    description:
      'Related circular ID (e.g., internal document reference) for the increment.',
    example: '5229f99c-4414-437a-beff-4711c4a473eb',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  circularId?: string; // Đã đổi thành optional vì trong class ban đầu cũng là optional

  @ApiProperty({
    description: 'File content encoded in Base64 (optional, for attachments).',
    example: imageBase64,
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  fileBase64?: string;

  @ApiProperty({
    description:
      'Original file name for the Base64 attachment (e.g., invoice_increment.pdf).',
    example: 'asset_increment_invoice.pdf',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  originalFileName?: string;
}
