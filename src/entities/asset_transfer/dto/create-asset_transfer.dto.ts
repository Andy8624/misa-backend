import { Expose, Transform } from 'class-transformer';
import { IsOptional, IsString, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { imageBase64 } from 'src/constants/base64-example'; // Giả định bạn vẫn muốn dùng ví dụ Base64 này

export class CreateAssetTransferDto {
  @ApiProperty({
    description: 'Date when the asset transfer voucher was posted (ISO 8601).',
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
  postedDate?: Date;

  @ApiProperty({
    description: 'Date of the asset transfer voucher (ISO 8601).',
    example: '2025-06-29T09:00:00.000Z',
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
    description: 'Unique number for the asset transfer voucher.',
    example: 'ATV-001-2025',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucherNumber?: string;

  @ApiProperty({
    description: 'Reason for the asset transfer.',
    example:
      'Chuyển tài sản từ phòng ban A sang phòng ban B để tối ưu hóa sử dụng.',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({
    description: 'ID of the employee who delivered the asset.',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  deliveredById?: string;

  @ApiProperty({
    description: 'ID of the employee who received the asset.',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  receivedById?: string;

  @ApiProperty({
    description: 'ID of the company associated with the asset transfer.',
    example: 'aeb395e2-5faf-44b0-8769-8aea89513612',
    required: false, // Model cho phép companyId là String?, nên đây là Optional
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  companyId?: string;

  @ApiProperty({
    description:
      'Related circular ID (e.g., internal document reference) for the transfer.',
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
      'Original file name for the Base64 attachment (e.g., transfer_document.pdf).',
    example: 'asset_transfer_report.pdf',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  originalFileName?: string;
}
