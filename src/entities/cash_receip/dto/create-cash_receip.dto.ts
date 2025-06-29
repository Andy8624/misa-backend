import { Expose, Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsDateString,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { imageBase64 } from 'src/constants/base64-example'; // Assuming you still want this Base64 example

export class CreateCashReceipDto {
  @ApiProperty({
    description: 'Type of cash receipt voucher.',
    example: 'SALES_COLLECTION',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cashReceiptVoucherType?: string;

  @ApiProperty({
    description: 'Payer of the cash receipt.',
    example: 'Nguyen Van A',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  payer?: string;

  @ApiProperty({
    description: 'Posting date of the cash receipt voucher (ISO 8601).',
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
    description: 'Voucher date of the cash receipt (ISO 8601).',
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
    description: 'Unique voucher number for the cash receipt.',
    example: 'CR0001-2025',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucherNumber?: string;

  @ApiProperty({
    description: 'Reason for cash collection.',
    example: 'Thu tiền bán hàng ABC',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({
    description:
      'Information about accompanying original vouchers (e.g., invoice numbers).',
    example: 'Hóa đơn GTGT 12345, Biên bản bàn giao',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  withOriginalVoucher?: string;

  @ApiProperty({
    description: 'ID of the employee related to this cash receipt.',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e', // Example Employee ID
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  employee?: string;

  @ApiProperty({
    description:
      'ID of the subject (e.g., vendor, other party) for this cash receipt.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Using the remembered subject/partner ID
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  subject?: string;

  @ApiProperty({
    description: 'ID of the customer related to this cash receipt.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Using the remembered customer ID
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  customer?: string;

  @ApiProperty({
    description: 'ID of the company receiving the cash.',
    example: 'aeb395e2-5faf-44b0-8769-8aea89513612', // Example Company ID
    required: true,
  })
  @Expose()
  @IsNotEmpty({ message: 'Company ID cannot be empty' })
  @IsUUID()
  companyId: string;

  @ApiProperty({
    description:
      'Related circular ID (e.g., official letter) for the cash receipt.',
    example: '5229f99c-4414-437a-beff-4711c4a473eb',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  circularId?: string; // Changed to optional as per your DTO's initial @IsOptional

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
      'Original file name for the Base64 attachment (e.g., payment_proof.pdf).',
    example: 'cash_receipt_document.pdf',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  originalFileName?: string;
}
