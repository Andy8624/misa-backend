import { Expose, Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsUUID,
  IsDateString,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { imageBase64 } from 'src/constants/base64-example'; // Giả định bạn vẫn muốn dùng ví dụ Base64 này

export class CreateSalesContractDto {
  @ApiProperty({
    description: 'ID of the related project (if any).',
    example: '2adff9cb-00cf-4a82-9a61-825bf36e847b',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  projectId?: string;

  @ApiProperty({
    description: 'Total value of the contract.',
    example: 100000.0,
    type: 'number',
    format: 'float',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsNumber()
  contractValue?: number;

  @ApiProperty({
    description:
      'Current status of the contract (e.g., "Draft", "Signed", "Completed").',
    example: 'Signed',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  contractStatus?: string;

  @ApiProperty({
    description:
      'Shipping status of goods related to the contract (e.g., "Pending", "Shipped", "Delivered").',
    example: 'Pending',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  shipStatus?: string;

  @ApiProperty({
    description: 'ID of the customer for this sales contract.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Sử dụng ID của customer/partner đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  customerId?: string;

  @ApiProperty({
    description: 'ID of the contact employee related to this contract.',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  contactEmployeeId?: string;

  @ApiProperty({
    description: 'Due date for delivery (ISO 8601).',
    example: '2025-08-15T10:00:00.000Z',
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
  deliveryDueDate?: Date;

  @ApiProperty({
    description: 'Due date for payment (ISO 8601).',
    example: '2025-08-30T10:00:00.000Z',
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
  paymentDueDate?: Date;

  @ApiProperty({
    description: 'Liquidation value of the contract.',
    example: 95000.0,
    type: 'number',
    format: 'float',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsNumber()
  liquidationValue?: number;

  @ApiProperty({
    description: 'Any other specific terms and conditions of the contract.',
    example: 'Giao hàng từng đợt, thanh toán theo tiến độ',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  otherTerms?: string;

  @ApiProperty({
    description: 'Address for delivery.',
    example: '123 Đường ABC, Quận XYZ, TP.HCM',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  deliveryAdress?: string;

  @ApiProperty({
    description: 'Indicates if costing is involved with this contract.',
    example: true,
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsBoolean()
  isCosting?: boolean;

  @ApiProperty({
    description: 'Indicates if the contract has been invoiced.',
    example: false,
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsBoolean()
  isInvoiced?: boolean;

  @ApiProperty({
    description: 'Indicates if this is pre-system data.',
    example: false,
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsBoolean()
  isPreSystemData?: boolean;

  @ApiProperty({
    description: 'ID of the company associated with the sales contract.',
    example: 'aeb395e2-5faf-44b0-8769-8aea89513612', // Ví dụ Company ID
    required: true,
  })
  @Expose()
  @IsNotEmpty({ message: 'Company ID cannot be empty' })
  @IsUUID()
  companyId: string;

  @ApiProperty({
    description: 'Date when the sales contract voucher was posted (ISO 8601).',
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
    description: 'Date of the sales contract voucher (ISO 8601).',
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
    description: 'Unique number for the sales contract voucher.',
    example: 'HD-BH-001-2025',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucherNumber?: string;

  @ApiProperty({
    description:
      'Related circular ID (e.g., internal document reference) for the sales contract.',
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
      'Original file name for the Base64 attachment (e.g., sales_contract_agreement.pdf).',
    example: 'sales_contract_2025_ABC_Company.pdf',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  originalFileName?: string;
}
