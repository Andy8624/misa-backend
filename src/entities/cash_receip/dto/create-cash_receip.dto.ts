import { Expose, Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsDateString,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCashReceipDto {
  @ApiProperty({
    description: 'Type of cash receipt voucher',
    example: 'SALES_COLLECTION',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cashReceiptVoucherType?: string;

  @ApiProperty({
    description: 'Payer of the cash receipt',
    example: 'John Doe',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  payer?: string;

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
    example: 'CR0001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucherNumber?: string;

  @ApiProperty({
    description: 'Reason for cash collection',
    example: 'Collection for ABC goods sales',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({
    description: 'Accompanying original voucher',
    example: 'Invoice VAT 123',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  withOriginalVoucher?: string;

  @ApiProperty({
    description: 'Related employee ID',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  employee?: string;

  @ApiProperty({
    description: 'Related subject ID (e.g., vendor, other party)',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  subject?: string;

  @ApiProperty({
    description: 'Related customer ID',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  customer?: string;

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
}
