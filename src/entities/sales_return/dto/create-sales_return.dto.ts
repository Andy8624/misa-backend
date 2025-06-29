import { Expose, Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsUUID,
  IsDateString,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { imageBase64 } from 'src/constants/base64-example'; // Giả định bạn vẫn muốn dùng ví dụ Base64 này

export class CreateSalesReturnDto {
  @ApiProperty({
    description: 'Voucher group for the sales return.',
    example: 'SALES_RETURN_GROUP',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucherGroup?: string;

  @ApiProperty({
    description: 'High-level voucher type (e.g., "Debt Reduction").',
    example: 'DEBT_REDUCTION',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucherTypeHigh?: string;

  @ApiProperty({
    description:
      'Medium-level voucher type (e.g., "Debt Reduction - Receipt Note - Payment Voucher - Invoice").',
    example: 'DEBT_REDUCTION_RECEIPT_PAYMENT_INVOICE',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucherTypeMedium?: string;

  @ApiProperty({
    description: 'Indicates if the sales return is also an inventory receipt.',
    example: true,
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsBoolean()
  isAlsoInventoryReceipt?: boolean;

  @ApiProperty({
    description: 'Lookup code for the original invoice related to the return.',
    example: 'INV-LOOKUP-CODE-001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoiceLookupCode?: string;

  @ApiProperty({
    description:
      'Path for looking up the original invoice related to the return.',
    example: '/invoices/INV-001-RETURN',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoiceLookupPath?: string;

  @ApiProperty({
    description: 'Description of the sales return.',
    example: 'Trả lại hàng do lỗi sản phẩm',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'ID of the customer returning the goods.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Sử dụng ID của customer/partner đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  customerId?: string;

  @ApiProperty({
    description: 'ID of the employee handling the sales return.',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e', // Ví dụ Employee ID
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  employeeId?: string;

  @ApiProperty({
    description: 'ID of the department associated with the sales return.',
    example: 'a13d79c2-5f04-41dc-ab89-f397d775f2cc',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  departmentId?: string;

  @ApiProperty({
    description: 'Code of the original voucher if the return is linked to one.',
    example: 'VC-ORIG-SALE-001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  withOriginalVoucher?: string;

  @ApiProperty({
    description: 'Name of the person delivering the returned goods.',
    example: 'Nguyễn Văn A',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  deliveryName?: string;

  @ApiProperty({
    description:
      'Name of the person receiving the payment (for payment voucher type).',
    example: 'Trần Thị B',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  recieptName?: string;

  @ApiProperty({
    description: 'Invoice number associated with the return.',
    example: 'HD-RT-2025-001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoiceNo?: string;

  @ApiProperty({
    description: 'Invoice symbol associated with the return.',
    example: 'AA/2025',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoiceSymbol?: string;

  @ApiProperty({
    description: 'ID of the company associated with the sales return.',
    example: 'aeb395e2-5faf-44b0-8769-8aea89513612', // Ví dụ Company ID
    required: true,
  })
  @Expose()
  @IsNotEmpty({ message: 'Company ID cannot be empty' })
  @IsUUID()
  companyId: string;

  @ApiProperty({
    description: 'Date when the sales return voucher was posted (ISO 8601).',
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
    description: 'Date of the sales return voucher (ISO 8601).',
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
    description: 'Unique number for the sales return voucher.',
    example: 'RT-001-2025',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucherNumber?: string;

  @ApiProperty({
    description:
      'Related circular ID (e.g., internal document reference) for the sales return.',
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
      'Original file name for the Base64 attachment (e.g., return_authorization.pdf).',
    example: 'sales_return_document.pdf',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  originalFileName?: string;
}
