import { Expose, Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsUUID,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { imageBase64 } from 'src/constants/base64-example'; // Giả định bạn vẫn muốn dùng ví dụ Base64 này

export class CreateSaleDiscountVoucherDto {
  @ApiProperty({
    description: 'Type of the sales discount voucher.',
    example: 'SALES_DISCOUNT',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucherType?: string;

  @ApiProperty({
    description: 'Internal type of the sales discount voucher.',
    example: 'TYPE_A',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  typeInside?: string;

  @ApiProperty({
    description:
      'ID of the customer (from Partner table) receiving the discount.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Sử dụng ID của customer/partner đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  customerId?: string;

  @ApiProperty({
    description: 'ID of the employee issuing the sales discount.',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e', // Ví dụ Employee ID
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  employeeId?: string;

  @ApiProperty({
    description: 'ID of the department associated with the sales discount.',
    example: 'a13d79c2-5f04-41dc-ab89-f397d775f2cc',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  departmentId?: string;

  @ApiProperty({
    description: 'Description of the sales discount voucher.',
    example: 'Giảm giá 10% cho đơn hàng số #12345',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Lookup code for the related invoice (if applicable).',
    example: 'INV-2025-001-CODE',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoiceLookupCode?: string;

  @ApiProperty({
    description: 'Path for looking up the related invoice (if applicable).',
    example: '/invoices/INV-2025-001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoiceLookupPath?: string;

  @ApiProperty({
    description: 'Invoice number associated with the discount.',
    example: 'HD-2025-001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoiceNo?: string;

  @ApiProperty({
    description: 'Invoice symbol associated with the discount.',
    example: 'AA/2025',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoiceSymbol?: string;

  @ApiProperty({
    description: 'Tax code associated with the sales discount.',
    example: 'MST-987654321',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  taxCode?: string;

  @ApiProperty({
    description:
      'Type of payment for the sales discount (e.g., "Cash", "Bank Transfer").',
    example: 'Cash',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  paymentType?: string;

  @ApiProperty({
    description:
      'ID of the bank account involved in the payment (if applicable).',
    example: '2138f2bf-1806-4206-a233-8329e7bbcf3f', // Sử dụng ID của bankaccount đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  bankAccountId?: string;

  @ApiProperty({
    description:
      'ID of the company associated with the sales discount voucher.',
    example: 'aeb395e2-5faf-44b0-8769-8aea89513612', // Ví dụ Company ID
    required: true,
  })
  @Expose()
  @IsNotEmpty({ message: 'Company ID cannot be empty' })
  @IsUUID()
  companyId: string;

  @ApiProperty({
    description: 'Date when the sales discount voucher was posted (ISO 8601).',
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
    description: 'Date of the sales discount voucher (ISO 8601).',
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
    description: 'Unique number for the sales discount voucher.',
    example: 'GGHB-VC-001-2025',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucherNumber?: string;

  @ApiProperty({
    description:
      'Related circular ID (e.g., internal document reference) for the sales discount.',
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
      'Original file name for the Base64 attachment (e.g., discount_approval.pdf).',
    example: 'sales_discount_note.pdf',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  originalFileName?: string;
}
