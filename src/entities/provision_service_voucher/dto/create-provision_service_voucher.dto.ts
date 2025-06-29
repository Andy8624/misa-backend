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

export class CreateProvisionServiceVoucherDto {
  @ApiProperty({
    description: 'Unique identifier for the voucher.',
    example: 'PSV001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucherNumber?: string;

  @ApiProperty({
    description: 'Current status of the payment (e.g., PAID, PENDING).',
    example: 'PENDING',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  paymentStatus?: string;

  @ApiProperty({
    description: 'Method of payment (e.g., CASH, BANK_TRANSFER).',
    example: 'BANK_TRANSFER',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiProperty({
    description: 'Indicates if an invoice is included ("true" or "false").',
    example: 'true',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString() // Có thể cân nhắc IsBoolean nếu bạn muốn nhận giá trị boolean
  withInvoice?: string;

  @ApiProperty({
    description:
      'Indicates if this is a substitute invoice ("true" or "false").',
    example: 'false',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString() // Có thể cân nhắc IsBoolean
  isSubstituteInvoice?: string;

  @ApiProperty({
    description: 'Other terms and conditions for the service.',
    example: 'Warranty for 1 year',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  other_t_and_c?: string;

  @ApiProperty({
    description: 'ID for searching e-invoice.',
    example: 'EINV12345',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  e_invoice_search_id?: string;

  @ApiProperty({
    description: 'URL for searching e-invoice.',
    example: 'https://e-invoice.example.com/search/EINV12345',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  e_invoice_search_url?: string;

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
  postDate?: Date;

  @ApiProperty({
    description: 'Date of the voucher (ISO 8601).',
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
    description: 'ID of the payment term.',
    example: 'df7a929c-ea1c-4f22-8280-71988fc882f5',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  paymentTAndC?: string;

  @ApiProperty({
    description: 'Number of days within which payment is due.',
    example: 30,
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsNumber()
  payWithinDay?: number;

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
    description: 'ID of the customer for cash receipt voucher.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  cash_receipt_customer_id?: string;

  @ApiProperty({
    description: 'Name of the customer for cash receipt voucher.',
    example: 'Customer A',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cash_receipt_customer_name?: string;

  @ApiProperty({
    description: 'Address of the customer for cash receipt voucher.',
    example: '123 Main St, City',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cash_receipt_address?: string;

  @ApiProperty({
    description: 'Bank account for cash receipt.',
    example: '5f8d2b9c-5300-44a4-bc65-926244336360', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID() // Assuming this is an ID to a bank account
  cash_receipt_back_account?: string;

  @ApiProperty({
    description: 'Name of the bank for cash receipt.',
    example: 'Vietcombank',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cash_receipt_back_name?: string;

  @ApiProperty({
    description: 'ID of the storeperson for cash receipt.',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  cashReceiptStoreperson?: string;

  @ApiProperty({
    description: 'Specific details for cash receipt voucher.',
    example: 'Payment for consultation',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cash_receipt_particular?: string;

  @ApiProperty({
    description: 'ID of the customer for debt voucher.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  debtVoucherCustomer?: string;

  @ApiProperty({
    description: 'Name of the customer for debt voucher.',
    example: 'Customer B',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  debt_voucher_customer_name?: string;

  @ApiProperty({
    description: 'Contact information for debt voucher.',
    example: '0901234567',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  debt_voucher_contact?: string;

  @ApiProperty({
    description: 'Tax code of the customer for debt voucher.',
    example: '1234567890',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  debt_voucher_tax_code?: string;

  @ApiProperty({
    description: 'Address of the customer for debt voucher.',
    example: '456 Oak Ave, Town',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  debt_voucher_address?: string;

  @ApiProperty({
    description: 'ID of the storeperson for debt voucher.',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  debtVoucherStoreperson?: string;

  @ApiProperty({
    description: 'Description for debt voucher.',
    example: 'Outstanding payment for services rendered',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  debt_voucher_description?: string;

  @ApiProperty({
    description: 'ID of the customer for invoice.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  invoiceCustomer?: string;

  @ApiProperty({
    description: 'Name of the customer for invoice.',
    example: 'Customer C',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoice_customer_name?: string;

  @ApiProperty({
    description: 'Tax code for invoice.',
    example: '0987654321',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoice_tax_code?: string;

  @ApiProperty({
    description: 'Name of the purchaser for invoice.',
    example: 'John Doe',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoice_purchaser?: string;

  @ApiProperty({
    description: 'Payment method for invoice.',
    example: 'Bank Transfer',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoice_payment_method?: string;

  @ApiProperty({
    description: 'Bank account for invoice.',
    example: '2138f2bf-1806-4206-a233-8329e7bbcf3f', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID() // Assuming this is an ID to a bank account
  invoice_bank_account?: string;

  @ApiProperty({
    description: 'Address for invoice.',
    example: '789 Pine Lane, Village',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoice_address?: string;

  @ApiProperty({
    description: 'Sign information for invoice.',
    example: 'Digital signature',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoice_sign?: string;

  @ApiProperty({
    description: 'Form of the invoice.',
    example: 'Physical',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoice_form?: string;

  @ApiProperty({
    description: 'Date of the invoice (ISO 8601).',
    example: '2025-06-25T14:30:00.000Z',
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
    description: 'Number of the invoice.',
    example: 'INV202506-001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoice_number?: string;

  @ApiProperty({
    description:
      'ID of the customer for cash receipt voucher (customer specific).',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  cash_receipt_voucher_customer_id?: string;

  @ApiProperty({
    description:
      'Name of the customer for cash receipt voucher (customer specific).',
    example: 'Payer Co.',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cash_receipt_voucher_customer_name?: string;

  @ApiProperty({
    description: 'Address for cash receipt voucher (customer specific).',
    example: '101 Bay Road, Beach City',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cash_receipt_voucher_address?: string;

  @ApiProperty({
    description: 'Payer for cash receipt voucher.',
    example: 'Individual Payer',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cash_receipt_voucher_payer?: string;

  @ApiProperty({
    description:
      'ID of the storeperson for cash receipt voucher (customer specific).',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  cash_receipt_voucher_storeperson?: string;

  @ApiProperty({
    description:
      'Specific details for cash receipt voucher (customer specific).',
    example: 'Service fee for Q2',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cash_receipt_voucher_particular?: string;

  @ApiProperty({
    description: 'Quantity of original vouchers for cash receipt voucher.',
    example: 1,
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsNumber()
  cash_receipt_voucher_with_original_voucher?: number;

  @ApiProperty({
    description: 'Percentage discount on invoice value.',
    example: 0.05, // 5%
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsNumber()
  percent_discount_invoice_value?: number;

  @ApiProperty({
    description: 'Type of discount applied (e.g., "Trade", "Volume").',
    example: 'Trade',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  discount_type?: string;

  @ApiProperty({
    description: 'ID of the related customer.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  customer?: string;

  @ApiProperty({
    description: 'Name of the related customer.',
    example: 'Global Solutions Inc.',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  customer_name?: string;

  @ApiProperty({
    description: 'Tax code of the related customer.',
    example: '9876543210',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  customer_tax_code?: string;

  @ApiProperty({
    description: 'Address of the related customer.',
    example: '222 Tech Park, Innovation City',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  customer_address?: string;

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
      'Original file name for the Base64 attachment (e.g., contract.pdf).',
    example: 'provision_service_contract.pdf',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  originalFileName?: string;
}
