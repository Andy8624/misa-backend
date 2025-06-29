import { Expose, Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { imageBase64 } from 'src/constants/base64-example'; // Giả định bạn vẫn muốn dùng ví dụ Base64 này

export class CreatePurchaseVoucherDto {
  @ApiProperty({
    description: 'Type of the purchase (e.g., "Goods", "Services").',
    example: 'Goods',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  purchase_type?: string;

  @ApiProperty({
    description: 'Unique identifier for the voucher.',
    example: 'PV001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucher_number?: string;

  @ApiProperty({
    description: 'Current status of the payment (e.g., "PAID", "PENDING").',
    example: 'PENDING',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  payment_status?: string;

  @ApiProperty({
    description: 'Method of payment (e.g., "CASH", "BANK_TRANSFER").',
    example: 'BANK_TRANSFER',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  payment_method?: string;

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
  posted_date?: Date;

  @ApiProperty({
    description: 'Date of the purchase voucher (ISO 8601).',
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
  voucher_date?: Date;

  @ApiProperty({
    description: 'ID of the payment terms and conditions.',
    example: 'df7a929c-ea1c-4f22-8280-71988fc882f5', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  payment_t_and_c?: string;

  @ApiProperty({
    description: 'Number of days within which payment is due.',
    example: 30,
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsNumber()
  pay_within_days?: number;

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
  due_date?: Date;

  @ApiProperty({
    description: 'ID of the supplier.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Dựa trên thông tin đã lưu (subject/partner/customer)
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  supplier?: string;

  @ApiProperty({
    description: 'Name of the supplier.',
    example: 'Supplier ABC',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  supplier_name?: string;

  @ApiProperty({
    description: 'Address of the supplier.',
    example: '123 Supplier St, City',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  supplier_address?: string;

  @ApiProperty({
    description: 'Tax code of the supplier.',
    example: '1234567890',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  supplier_tax_code?: string;

  @ApiProperty({
    description: 'Name of the courier.',
    example: 'Fast Delivery',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  courier?: string;

  @ApiProperty({
    description: 'ID of the purchasing staff.',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e', // Ví dụ Employee ID
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  purchasing_staff?: string;

  @ApiProperty({
    description: 'Recipient of the purchased items.',
    example: 'Warehouse Manager',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  receipient?: string;

  @ApiProperty({
    description: 'Quantity of original documents/numbers.',
    example: '5',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString() // Có thể cân nhắc IsNumber nếu đây là số
  quantity_original_number?: string;

  @ApiProperty({
    description: 'Inventory in voucher number.',
    example: 'IIV005',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  inventory_in_voucher_no?: string;

  @ApiProperty({
    description: 'ID of the recipient bank account.',
    example: '2138f2bf-1806-4206-a233-8329e7bbcf3f', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  recipient_account?: string;

  @ApiProperty({
    description: 'Bank name of the recipient account.',
    example: 'Vietcombank',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  recipient_account_bank_name?: string;

  @ApiProperty({
    description: 'Description of the purchase voucher.',
    example: 'Purchase of raw materials for production',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'ID of the payment bank account.',
    example: '2138f2bf-1806-4206-a233-8329e7bbcf3f', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  payment_account?: string;

  @ApiProperty({
    description: 'Bank name of the payment account.',
    example: 'ACB',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  payment_account_bank_name?: string;

  @ApiProperty({
    description: 'E-invoice search ID.',
    example: 'EINVPU001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  e_invoice_search_id?: string;

  @ApiProperty({
    description: 'URL for searching e-invoice.',
    example: 'https://e-invoice.example.com/search/EINVPU001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  e_invoice_search_url?: string;

  @ApiProperty({
    description: 'Particular details for inventory in voucher.',
    example: 'Goods received from Supplier ABC',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  inventory_in_voucher_particular?: string;

  @ApiProperty({
    description: 'Particular details for cash payment voucher.',
    example: 'Cash payment for urgent supplies',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cash_payment_voucher_particular?: string;

  @ApiProperty({
    description: 'Particular details for debt voucher.',
    example: 'Outstanding debt for previous month delivery',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  debt_voucher_particular?: string;

  @ApiProperty({
    description: 'Form of the invoice (e.g., "Paper", "E-invoice").',
    example: 'E-invoice',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoice_form?: string;

  @ApiProperty({
    description: 'Sign information on the invoice.',
    example: 'Digital signature',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoice_sign?: string;

  @ApiProperty({
    description: 'Unique number of the invoice.',
    example: 'INV-PU-2025-001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoice_number?: string;

  @ApiProperty({
    description: 'Date of the invoice (ISO 8601).',
    example: '2025-06-28T14:30:00.000Z',
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
  invoice_date?: Date;

  @ApiProperty({
    description:
      'Discount amount or description (e.g., "10% off", "500000 VND").',
    example: '10% off',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  discount?: string;

  @ApiProperty({
    description: 'Discount rate (e.g., "0.1" for 10%).',
    example: '0.1',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString() // Có thể cân nhắc IsNumber nếu đây là số
  discount_rate?: string;

  @ApiProperty({
    description: 'Personal ID number (for counter cheque).',
    example: '123456789',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  personal_id_number?: string;

  @ApiProperty({
    description:
      'Date of issue (for counter cheque) (ISO 8601 string or specific format).',
    example: '2025-06-29', // Hoặc '2025-06-29T00:00:00.000Z' nếu là DateTime
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString() // Nếu bạn muốn nó là Date, hãy thêm @Transform và @IsDateString
  issued_date?: string;

  @ApiProperty({
    description: 'Authority by whom the counter cheque was issued.',
    example: 'Bank X',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  issued_by?: string;

  @ApiProperty({
    description:
      'Indicates if an invoice is included (for counter cheque) ("true" or "false").',
    example: 'true',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString() // Có thể cân nhắc IsBoolean
  invoice_inclusion?: string;

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
    example: 'purchase_order.pdf',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  originalFileName?: string;
}
