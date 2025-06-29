// src/cash-payment/dto/create-cash-payment.dto.ts
import { Expose, Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCashPaymentDto {
  @ApiProperty({
    description: 'Type of cash payment voucher',
    example: 'SUPPLIER_PAYMENT',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cashPaymentVoucherType?: string;

  @ApiProperty({
    description: 'Name of the recipient',
    example: 'ABC Company',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  recipient?: string;

  @ApiProperty({
    description: 'Name of the supplier',
    example: 'XYZ Supplier',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  supplierName?: string;

  @ApiProperty({
    description: 'Reason for payment',
    example: 'Payment for services rendered',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({
    description: 'Number of accompanying original vouchers',
    example: 'INV-2025-001, PO-005',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  withOriginalVoucher?: string;

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
  ) // Ensure ISO string for dates
  @IsOptional()
  @IsDateString() // Validate as date string
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
  ) // Ensure ISO string for dates
  @IsOptional()
  @IsDateString() // Validate as date string
  voucherDate?: Date;

  @ApiProperty({
    description: 'Voucher number',
    example: 'CP0001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucherNumber?: string;

  @ApiProperty({
    description: 'Related employee ID',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID() // Validate as UUID
  employee?: string;

  @ApiProperty({
    description: 'Related subject ID (e.g., partner, vendor)',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID() // Validate as UUID
  subject?: string;

  @ApiProperty({
    description: 'Related supplier ID',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID() // Validate as UUID
  supplier?: string;

  @ApiProperty({
    description: 'Company ID',
    example: 'aeb395e2-5faf-44b0-8769-8aea89513612',
    required: true,
  })
  @Expose()
  @IsNotEmpty() // Make it required for validation
  @IsUUID() // Validate as UUID
  companyId: string;

  @ApiProperty({
    description: 'Related circular ID (e.g., official letter)',
    example: '5229f99c-4414-437a-beff-4711c4a473eb',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID() // Validate as UUID
  circularId: string;
}
