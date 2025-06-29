import { Expose, Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { imageBase64 } from 'src/constants/base64-example'; // Giả định bạn vẫn muốn dùng ví dụ Base64 này

export class CreateCashPaymentDto {
  @ApiProperty({
    description: 'Type of cash payment voucher.',
    example: 'SUPPLIER_PAYMENT',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cashPaymentVoucherType?: string;

  @ApiProperty({
    description: 'Name of the recipient for the cash payment.',
    example: 'ABC Company',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  recipient?: string;

  @ApiProperty({
    description: 'Name of the supplier involved in the cash payment.',
    example: 'XYZ Supplier',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  supplierName?: string;

  @ApiProperty({
    description: 'Reason for the cash payment.',
    example: 'Payment for services rendered',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({
    description:
      'Information about accompanying original vouchers (e.g., invoice numbers).',
    example: 'INV-2025-001, PO-005',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  withOriginalVoucher?: string;

  @ApiProperty({
    description: 'Posting date of the cash payment voucher (ISO 8601).',
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
    description: 'Voucher date of the cash payment (ISO 8601).',
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
    description: 'Unique voucher number for the cash payment.',
    example: 'CP0001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucherNumber?: string;

  @ApiProperty({
    description: 'ID of the employee related to this cash payment.',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e', // Ví dụ Employee ID
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  employee?: string;

  @ApiProperty({
    description:
      'ID of the subject (e.g., partner, vendor) for this cash payment.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Sử dụng ID của partner/subject đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  subject?: string;

  @ApiProperty({
    description: 'ID of the supplier for this cash payment.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Sử dụng ID của partner/supplier đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  supplier?: string;

  @ApiProperty({
    description: 'ID of the company initiating the cash payment.',
    example: 'aeb395e2-5faf-44b0-8769-8aea89513612', // Ví dụ Company ID
    required: true,
  })
  @Expose()
  @IsNotEmpty({ message: 'Company ID cannot be empty' })
  @IsUUID()
  companyId: string;

  @ApiProperty({
    description:
      'Related circular ID (e.g., official letter) for the cash payment.',
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
      'Original file name for the Base64 attachment (e.g., payment_receipt.pdf).',
    example: 'cash_payment_document.pdf',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  originalFileName?: string;
}
