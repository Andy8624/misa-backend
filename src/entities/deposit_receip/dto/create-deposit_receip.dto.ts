import { Expose, Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { imageBase64 } from 'src/constants/base64-example';

export class CreateDepositReceipDto {
  @ApiProperty({
    description: 'Type of deposit receipt',
    example: 'DEPOSIT_FROM_SALES',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  depositReceipType?: string;

  @ApiProperty({
    description: 'Posting date (ISO 8601)',
    example: '2025-06-27T12:00:00.000Z',
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
    description: 'Voucher date (ISO 8601)',
    example: '2025-06-27T12:00:00.000Z',
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
    description: 'Voucher number',
    example: 'DR0001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucherNumber?: string;

  @ApiProperty({
    description: 'Reason for deposit',
    example: 'Deposit for customer payment',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({
    description: 'ID of the debt collector employee',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  debtCollector?: string;

  @ApiProperty({
    description: 'ID of the related employee',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  employee?: string;

  @ApiProperty({
    description: 'ID of the related subject (e.g., partner)',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  subject?: string;

  @ApiProperty({
    description: 'ID of the related customer',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  customer?: string;

  @ApiProperty({
    description: 'ID of the related bank account',
    example: '2138f2bf-1806-4206-a233-8329e7bbcf3f',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  bank?: string;

  @ApiProperty({
    description: 'Company ID',
    example: 'aeb395e2-5faf-44b0-8769-8aea89513612',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  companyId: string;

  @ApiProperty({
    description: 'Related circular ID (e.g., official letter)',
    example: '5229f99c-4414-437a-beff-4711c4a473eb',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  circularId: string;

  // --- New fields for Base64 file upload ---
  @ApiProperty({
    description: 'File content encoded in Base64 (optional)',
    example: imageBase64,
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  fileBase64?: string;

  @ApiProperty({
    description: 'Original file name (e.g., document.pdf) (optional)',
    example: 'invoice.pdf',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  originalFileName?: string;
}
