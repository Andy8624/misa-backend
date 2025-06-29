import { Expose, Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsUUID,
  IsDateString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { imageBase64 } from 'src/constants/base64-example'; // Giả định bạn vẫn muốn dùng ví dụ Base64 này

export class CreatePurchaseOrderDto {
  @ApiProperty({
    description: 'ID of the customer for the purchase order.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Sử dụng ID của customer/partner đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  customerId?: string;

  @ApiProperty({
    description: 'ID of the employee handling the purchase order.',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e', // Ví dụ Employee ID
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  employeeId?: string;

  @ApiProperty({
    description: 'Tax code associated with the purchase order.',
    example: 'MST-00123456789',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  taxCode?: string;

  @ApiProperty({
    description: 'Name of the recipient for the purchase order.',
    example: 'Nguyễn Văn A',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  recipientName?: string;

  @ApiProperty({
    description: 'General description of the purchase order.',
    example: 'Đơn hàng mua sắm vật tư văn phòng',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'ID of the payment term for the purchase order.',
    example: 'df7a929c-ea1c-4f22-8280-71988fc882f5', // paymentTermId
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  paymentTermId?: string;

  @ApiProperty({
    description: 'Number of credit days allowed for payment.',
    example: 30,
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsInt()
  creditDays?: number;

  @ApiProperty({
    description: 'Indicates if costing is applied to the order.',
    example: false,
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsBoolean()
  isCosting?: boolean;

  @ApiProperty({
    description: 'Status of the order (e.g., pending, confirmed, canceled).',
    example: 'pending',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  orderStatus?: string;

  @ApiProperty({
    description: 'Status of the delivery (e.g., pending, shipped, delivered).',
    example: 'pending',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  deliveryStatus?: string;

  @ApiProperty({
    description: 'Expected delivery date (ISO 8601).',
    example: '2025-07-05T10:00:00.000Z',
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
  deliveryDate?: Date;

  @ApiProperty({
    description: 'Address for delivery.',
    example: '123 Đường ABC, Quận XYZ, Thành phố Cần Thơ',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  deliveryAddress?: string;

  @ApiProperty({
    description: 'ID of the company associated with the purchase order.',
    example: 'aeb395e2-5faf-44b0-8769-8aea89513612', // Ví dụ Company ID
    required: true,
  })
  @Expose()
  @IsNotEmpty({ message: 'Company ID cannot be empty' })
  @IsUUID()
  companyId: string;

  @ApiProperty({
    description: 'Date when the purchase order voucher was posted (ISO 8601).',
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
    description: 'Date of the purchase order voucher (ISO 8601).',
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
    description: 'Unique number for the purchase order voucher.',
    example: 'DH-001-2025',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucherNumber?: string;

  @ApiProperty({
    description:
      'Related circular ID (e.g., internal document reference) for the purchase order.',
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
      'Original file name for the Base64 attachment (e.g., purchase_order_form.pdf).',
    example: 'purchase_order_001.pdf',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  originalFileName?: string;
}
