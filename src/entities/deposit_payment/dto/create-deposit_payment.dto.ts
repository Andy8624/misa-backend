import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID, // Thêm IsUUID để validate các ID
  IsDateString, // Thêm IsDateString cho các trường ngày
} from 'class-validator';
import { imageBase64 } from 'src/constants/base64-example';

export class CreateDepositPaymentDto {
  @ApiProperty({
    description: 'Type of deposit payment (e.g., PAYMENT_TO_SUPPLIER)',
    example: 'PAYMENT_FOR_SERVICES',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  depositPaymentType?: string;

  @ApiProperty({
    description: 'Method of payment (e.g., CASH, BANK_TRANSFER, CREDIT_CARD)',
    example: 'BANK_TRANSFER',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiProperty({
    description: 'Name of the bank from which the payment is made',
    example: 'Vietcombank',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  paymentBankName?: string;

  @ApiProperty({
    description: 'Name of the recipient bank',
    example: 'Agribank',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  receipBankName?: string;

  @ApiProperty({
    description: 'General description or reason for the payment',
    example: 'Payment for office supplies',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'ID card number of the payer (if applicable)',
    example: '123456789',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  idCardNo?: string;

  @ApiProperty({
    description: 'Authority that issued the ID card',
    example: 'Public Security of Hanoi',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  issuedBy?: string;

  @ApiProperty({
    description: 'Date the ID card was issued (ISO 8601)',
    example: '2020-01-15T00:00:00.000Z',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @Expose()
  @Transform(({ value }) =>
    value instanceof Date ? value.toISOString() : value,
  ) // Đảm bảo chuyển đổi Date sang string
  @IsOptional()
  @IsDateString() // Validate là chuỗi ngày hợp lệ
  issuedDate?: Date;

  @ApiProperty({
    description: 'Voucher number associated with the payment',
    example: 'PM0001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucherNumber?: string;

  @ApiProperty({
    description: 'Date of the voucher (ISO 8601)',
    example: '2025-06-27T12:00:00.000Z',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @Expose()
  @Transform(({ value }) =>
    value instanceof Date ? value.toISOString() : value,
  ) // Đảm bảo chuyển đổi Date sang string
  @IsOptional()
  @IsDateString() // Validate là chuỗi ngày hợp lệ
  voucherDate?: Date;

  @ApiProperty({
    description: 'ID of the employee related to the payment',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID() // Validate là UUID
  employee?: string;

  @ApiProperty({
    description: 'ID of the bank account involved in the payment',
    example: '2138f2bf-1806-4206-a233-8329e7bbcf3f',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID() // Validate là UUID
  bank?: string;

  @ApiProperty({
    description: 'ID of the supplier receiving the payment',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID() // Validate là UUID
  supplier?: string;

  @ApiProperty({
    description: 'ID of the related subject (e.g., project, department)',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID() // Validate là UUID
  subject?: string;

  @ApiProperty({
    description: 'Company ID to which this payment belongs',
    example: 'aeb395e2-5faf-44b0-8769-8aea89513612',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsUUID() // Validate là UUID
  companyId: string;

  @ApiProperty({
    description: 'Related circular ID (e.g., internal document reference)',
    example: '5229f99c-4414-437a-beff-4711c4a473eb',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID() // Validate là UUID
  circularId: string;

  @ApiProperty({
    description: 'File content encoded in Base64 (optional, for attachments)',
    example: imageBase64,
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  fileBase64?: string;

  @ApiProperty({
    description:
      'Original file name for the Base64 attachment (e.g., document.pdf)',
    example: 'payment_receipt.pdf',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  originalFileName?: string;
}
