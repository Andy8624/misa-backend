import { Expose, Transform } from 'class-transformer';
import { IsOptional, IsString, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { imageBase64 } from 'src/constants/base64-example'; // Giả định bạn vẫn muốn dùng ví dụ Base64 này

export class CreateAssetRevaluationDto {
  @ApiProperty({
    description: 'Revaluation record number.',
    example: 'BB-DG-001-2025',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  revaluationCode?: string;

  @ApiProperty({
    description: 'Date of the asset revaluation (ISO 8601).',
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
  revaluationDate?: Date;

  @ApiProperty({
    description: 'Reason for the asset revaluation.',
    example: 'Điều chỉnh giá trị tài sản theo thị trường',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({
    description: 'Date when the revaluation transaction was posted (ISO 8601).',
    example: '2025-06-29T10:15:00.000Z',
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
  postedDate?: Date;

  @ApiProperty({
    description: 'Date of the revaluation voucher (ISO 8601).',
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
  voucherDate?: Date;

  @ApiProperty({
    description: 'Unique number for the revaluation voucher.',
    example: 'DGT-VC-2025-001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucherNumber?: string;

  @ApiProperty({
    description: 'ID of the company associated with the asset revaluation.',
    example: 'aeb395e2-5faf-44b0-8769-8aea89513612',
    required: false, // Model cho phép companyId là String?, nên đây là Optional
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  companyId?: string;

  @ApiProperty({
    description:
      'Related circular ID (e.g., internal document reference) for the revaluation.',
    example: '5229f99c-4414-437a-beff-4711c4a473eb',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  circularId?: string;

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
      'Original file name for the Base64 attachment (e.g., revaluation_document.pdf).',
    example: 'asset_revaluation_report.pdf',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  originalFileName?: string;
}
