import { Expose, Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID, // Thêm IsUUID để validate các ID
  IsDateString, // Thêm IsDateString cho các trường ngày
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { imageBase64 } from 'src/constants/base64-example'; // Giả định bạn vẫn muốn dùng ví dụ Base64 này

export class CreateServicePurchaseVoucherDto {
  @ApiProperty({
    description:
      'ID card number of the person involved in the service purchase.',
    example: '123456789',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  idCardNo?: string;

  @ApiProperty({
    description:
      'Payment method used for the service purchase (e.g., CASH, BANK_TRANSFER).',
    example: 'BANK_TRANSFER',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiProperty({
    description:
      'Current status of the payment (e.g., PAID, PENDING, OVERDUE).',
    example: 'PAID',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  paymentStatus?: string;

  @ApiProperty({
    description: 'Name of the bank account from which the payment was made.',
    example: 'Vietcombank',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  paymentAccountBankName?: string;

  @ApiProperty({
    description: 'Detailed description of the payment transaction.',
    example: 'Payment for cloud services subscription',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  paymentDetail?: string;

  @ApiProperty({
    description:
      'Indicates if an invoice is included with the purchase (e.g., "YES", "NO").',
    example: 'YES',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoiceInclusion?: string;

  @ApiProperty({
    description: 'General description of the service purchase.',
    example: 'Monthly IT support services',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Name of the recipient of the service or payment.',
    example: 'Nguyen Van A',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  receipient?: string; // Lưu ý: 'receipient' có thể là lỗi chính tả của 'recipient'

  @ApiProperty({
    description: 'Specific details or unique identifier for the service.',
    example: 'Project Alpha Phase 2',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  particular?: string;

  @ApiProperty({
    description:
      'Quantity of original vouchers or documents related to the purchase.',
    example: '1',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  quantityOriginalVoucher?: string;

  @ApiProperty({
    description: 'Name of the person or entity receiving the service/payment.',
    example: 'ABC Solutions Ltd.',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  recipient?: string; // Có vẻ bị trùng với 'receipient' ở trên, cần xem xét lại

  @ApiProperty({
    description: 'Account name of the recipient.',
    example: 'ABC Solutions Bank Account',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  recipientAccountName?: string;

  @ApiProperty({
    description: 'Name of the supplier providing the service.',
    example: 'Tech Support Co.',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  supplierName?: string;

  @ApiProperty({
    description: 'Address of the supplier.',
    example: '123 Tech Street, City',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  supplierAddress?: string;

  @ApiProperty({
    description: 'Date the service purchase voucher was issued (ISO 8601).',
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
  issuedDate?: Date;

  @ApiProperty({
    description: 'Name of the person or department who issued the voucher.',
    example: 'Finance Department',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  issuedBy?: string;

  @ApiProperty({
    description: 'Number of days within which payment is due (e.g., 30, 60).',
    example: '30',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString() // Hoặc IsNumber nếu nó luôn là số
  payWithInDays?: string;

  @ApiProperty({
    description: 'Due date for the payment (ISO 8601).',
    example: '2025-07-29T10:00:00.000Z',
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
  dueDate?: Date;

  @ApiProperty({
    description: 'Cash payment voucher number, if applicable.',
    example: 'CPV001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cashPaymentVoucherNo?: string;

  @ApiProperty({
    description: 'Date of the cash payment voucher (ISO 8601).',
    example: '2025-06-28T10:00:00.000Z',
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
  cashPaymentVoucherDate?: Date;

  @ApiProperty({
    description: 'Date when the voucher was posted (ISO 8601).',
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
    description: 'Unique identifier for the voucher.',
    example: 'SPV001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucherNumber?: string;

  @ApiProperty({
    description: 'Date of the service purchase voucher (ISO 8601).',
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
  voucherDate?: Date;

  @ApiProperty({
    description: 'Supplier name for purchases without explicit invoice info.',
    example: 'Local Shop',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  purchase_without_invoiceInfo_supplier_name?: string;

  @ApiProperty({
    description: 'ID card number for purchases without explicit invoice info.',
    example: '987654321',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  purchase_without_invoiceInfo_id_card_no?: string;

  @ApiProperty({
    description: 'Address for purchases without explicit invoice info.',
    example: '456 Market St, Town',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  purchase_without_invoiceInfo_address?: string;

  @ApiProperty({
    description: 'ID of the recipient account.',
    example: '5f8d2b9c-5300-44a4-bc65-926244336360', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  recipientAccount?: string;

  @ApiProperty({
    description: 'ID of the supplier.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  supplier?: string;

  @ApiProperty({
    description: 'ID of the purchasing staff.',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  purchasingStaff?: string;

  @ApiProperty({
    description: 'ID of the payment account.',
    example: '5f8d2b9c-5300-44a4-bc65-926244336360',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  paymentAccount?: string;

  @ApiProperty({
    description: 'ID of the payment term.',
    example: 'df7a929c-ea1c-4f22-8280-71988fc882f5',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  paymentTerm?: string;

  @ApiProperty({
    description: 'Company ID.',
    example: 'aeb395e2-5faf-44b0-8769-8aea89513612',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  companyId: string;

  @ApiProperty({
    description: 'Related circular ID (e.g., internal document reference).',
    example: '5229f99c-4414-437a-beff-4711c4a473eb',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  circularId: string;

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
      'Original file name for the Base64 attachment (e.g., invoice.pdf).',
    example: 'service_agreement.pdf',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  originalFileName?: string;
}
