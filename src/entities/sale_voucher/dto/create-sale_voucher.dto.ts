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

export class CreateSaleVoucherDto {
  @ApiProperty({
    description:
      'Current status of the payment (e.g., PAID, PENDING, OVERDUE).',
    example: 'PENDING',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  payment_status?: string;

  @ApiProperty({
    description: 'Method of payment (e.g., CASH, BANK_TRANSFER, CREDIT_CARD).',
    example: 'BANK_TRANSFER',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  payment_method?: string;

  @ApiProperty({
    description:
      'Indicates if an inventory out voucher is included ("true" or "false").',
    example: 'true',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString() // Có thể cân nhắc IsBoolean nếu bạn muốn nhận giá trị boolean
  inventory_out_voucher_included?: string;

  @ApiProperty({
    description: 'Indicates if an invoice is included ("true" or "false").',
    example: 'true',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString() // Có thể cân nhắc IsBoolean
  with_invoice?: string;

  @ApiProperty({
    description:
      'Indicates if this is a substitute invoice ("true" or "false").',
    example: 'false',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString() // Có thể cân nhắc IsBoolean
  is_substitute_invoice?: string;

  @ApiProperty({
    description: 'Location where goods are picked up.',
    example: 'Warehouse A',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  pick_up_location?: string;

  @ApiProperty({
    description: 'Other terms and conditions for the sale.',
    example: 'Delivery within 3 days',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  other_t_and_c?: string;

  @ApiProperty({
    description: 'ID for searching e-invoice.',
    example: 'EINV67890',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  e_invoice_search_id?: string;

  @ApiProperty({
    description: 'URL for searching e-invoice.',
    example: 'https://e-invoice.example.com/search/EINV67890',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  e_invoice_search_url?: string;

  @ApiProperty({
    description: 'Date when the voucher was posted (ISO 8601).',
    example: '2025-06-29T11:00:00.000Z',
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
    description: 'Date of the sales voucher (ISO 8601).',
    example: '2025-06-29T10:30:00.000Z',
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
    description: 'ID of the payment term.',
    example: 'df7a929c-ea1c-4f22-8280-71988fc882f5',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  payment_t_and_c?: string;

  @ApiProperty({
    description: 'Number of days within which payment is due.',
    example: 60,
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsNumber()
  pay_within_days?: number;

  @ApiProperty({
    description: 'Due date for the payment (ISO 8601).',
    example: '2025-08-28T10:30:00.000Z',
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
    description: 'Contract number related to the sale.',
    example: 'CONTRACT-2025-001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  contract_number?: string;

  @ApiProperty({
    description: 'Date of the contract (ISO 8601).',
    example: '2025-06-01T00:00:00.000Z',
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
  contract_date?: Date;

  @ApiProperty({
    description: 'Bill of Lading number for export.',
    example: 'BL-EX-007',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  b_l_no?: string;

  @ApiProperty({
    description: 'Container number for export.',
    example: 'CONT-XYZ-123',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  container_no?: string;

  @ApiProperty({
    description: 'Pick-up location for export.',
    example: 'Port of Saigon',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  export_pick_up_location?: string;

  @ApiProperty({
    description: 'Provider handling the shipping.',
    example: 'FastShip Logistics',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  shipping_provider?: string;

  @ApiProperty({
    description: 'Type of discount applied (e.g., "Volume", "Promotional").',
    example: 'Volume',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  discount_type?: string;

  @ApiProperty({
    description:
      'Percentage discount on the invoice value (e.g., "0.1" for 10%).',
    example: '0.1',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString() // Có thể cân nhắc IsNumber nếu đây là một giá trị số
  percent_discount_invoice_value?: string;

  @ApiProperty({
    description: 'ID of the customer on the invoice.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  invoice_customer_id?: string;

  @ApiProperty({
    description: 'Name of the customer on the invoice.',
    example: 'ABC Corp',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoice_customer_name?: string;

  @ApiProperty({
    description: 'Tax code of the customer on the invoice.',
    example: '1234567890',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoice_tax_code?: string;

  @ApiProperty({
    description: 'Address of the customer on the invoice.',
    example: '456 Business Blvd, Suite 100',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoice_address?: string;

  @ApiProperty({
    description: 'Name of the purchaser on the invoice.',
    example: 'Jane Doe',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoice_purchaser?: string;

  @ApiProperty({
    description: 'Payment method specified on the invoice.',
    example: 'Bank Transfer',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoice_payment_method?: string;

  @ApiProperty({
    description: 'Bank account number specified on the invoice.',
    example: '2138f2bf-1806-4206-a233-8329e7bbcf3f', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID() // Assuming this is an ID to a bank account
  invoice_bank_account?: string;

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
    example: 'INV-2025-001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  invoice_number?: string;

  @ApiProperty({
    description: 'Date of the invoice (ISO 8601).',
    example: '2025-06-28T16:00:00.000Z',
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
    description: 'ID of the customer for the inventory out voucher.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  inventory_out_voucher_customer_id?: string;

  @ApiProperty({
    description: 'Name of the customer for the inventory out voucher.',
    example: 'Customer for Inv Out',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  inventory_out_voucher_customer_name?: string;

  @ApiProperty({
    description: 'Recipient of the inventory out voucher.',
    example: 'Warehouse Manager',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  inventory_out_voucher_receipient?: string;

  @ApiProperty({
    description: 'Address for the inventory out voucher.',
    example: 'Warehouse Address, Zone B',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  inventory_out_voucher_address?: string;

  @ApiProperty({
    description: 'ID of the storeperson for the inventory out voucher.',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  inventory_out_voucher_storeperson?: string;

  @ApiProperty({
    description: 'Particular details for the inventory out voucher.',
    example: 'Goods for Sales Order #123',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  inventory_out_voucher_particular?: string;

  @ApiProperty({
    description:
      'Indicates if original voucher is included for inventory out voucher ("true" or "false").',
    example: 'true',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString() // Có thể cân nhắc IsBoolean
  inventory_out_voucher_with_original_voucher?: string;

  @ApiProperty({
    description: 'ID of the customer for the debt voucher.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  debt_voucher_customer_id?: string;

  @ApiProperty({
    description: 'Name of the customer for the debt voucher.',
    example: 'Customer for Debt',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  debt_voucher_customer_name?: string;

  @ApiProperty({
    description: 'Tax code for the debt voucher.',
    example: '1122334455',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  debt_voucher_tax_code?: string;

  @ApiProperty({
    description: 'Address for the debt voucher.',
    example: '789 Debt Street, Financial District',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  debt_voucher_address?: string;

  @ApiProperty({
    description: 'Contact person for the debt voucher.',
    example: 'Contact Person',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  debt_voucher_contact?: string;

  @ApiProperty({
    description: 'ID of the storeperson for the debt voucher.',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  debt_voucher_storeperson?: string;

  @ApiProperty({
    description: 'Description for the debt voucher.',
    example: 'Outstanding balance for Q1 sales',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  debt_voucher_description?: string;

  @ApiProperty({
    description:
      'ID of the debt_voucher_principal for the cash receipt voucher.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  debt_voucher_principal?: string;

  @ApiProperty({
    description: 'ID of the debt_voucher_trustor for the cash receipt voucher.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  debt_voucher_trustor?: string;

  @ApiProperty({
    description: 'ID of the customer for the cash receipt.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  cash_receipt_customer_id?: string;

  @ApiProperty({
    description: 'Name of the customer for the cash receipt.',
    example: 'Cash Receipt Customer',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cash_receipt_customer_name?: string;

  @ApiProperty({
    description: 'Address for the cash receipt.',
    example: '100 Receipt Lane, Financial City',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cash_receipt_customer_address?: string;

  @ApiProperty({
    description: 'Bank name for the cash receipt.',
    example: '5f8d2b9c-5300-44a4-bc65-926244336360', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  cash_receipt_cash_in_bank_receipt?: string;

  @ApiProperty({
    description: 'cash_receipt_bank_name.',
    example: 'Bank name',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cash_receipt_bank_name?: string;

  @ApiProperty({
    description: 'ID of the storeperson for the cash receipt.',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  cash_receipt_storeperson?: string;

  @ApiProperty({
    description: 'Particular details for the cash receipt.',
    example: 'Payment for Product X',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cash_receipt_particular?: string;

  @ApiProperty({
    description:
      'ID of the cash_receipt_principal for the cash receipt voucher.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  cash_receipt_principal?: string;

  @ApiProperty({
    description: 'ID of the customer for the cash receipt voucher.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  cash_receipt_voucher_customer_id?: string;

  @ApiProperty({
    description: 'Name of the customer for the cash receipt voucher.',
    example: 'Voucher Customer',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cash_receipt_voucher_customer_name?: string;

  @ApiProperty({
    description: 'Payer for the cash receipt voucher.',
    example: 'Company Z',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cash_receipt_voucher_payer?: string;

  @ApiProperty({
    description: 'ID of the storeperson for the cash receipt voucher.',
    example: '0810d32d-8206-4b95-b5e1-c93a79b6e73e',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  cash_receipt_voucher_storeperson?: string;

  @ApiProperty({
    description: 'Address for the cash receipt voucher.',
    example: 'Address for Voucher Customer',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cash_receipt_voucher_address?: string;

  @ApiProperty({
    description:
      'Indicates if original voucher is included for cash receipt voucher ("true" or "false").',
    example: 'true',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString() // Có thể cân nhắc IsBoolean
  cash_receipt_voucher_with_original_voucher?: string;

  @ApiProperty({
    description: 'Particular details for the cash receipt voucher.',
    example: 'Sales Payment Received',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  cash_receipt_voucher_particular?: string;

  @ApiProperty({
    description:
      'ID of the cash_receipt_voucher_principal for the cash receipt voucher.',
    example: 'f930c655-d398-4031-ad86-077d4231b9fe', // Dựa trên thông tin đã lưu
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsUUID()
  cash_receipt_voucher_principal?: string;

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
    example: 'Big Customer Co.',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  customer_name?: string;

  @ApiProperty({
    description:
      'ID of the sales voucher (if linking to another sales voucher).',
    example: 'SV-REF-001',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString() // Hoặc IsUUID nếu là ID thực sự
  sales_voucher?: string;

  @ApiProperty({
    description: 'Tax code of the related customer.',
    example: '6789012345',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  customer_tax_code?: string;

  @ApiProperty({
    description: 'Address of the related customer.',
    example: '555 Market St, Grand City',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  customer_address?: string;

  @ApiProperty({
    description:
      'Unique identifier for the voucher (duplicate field, consider removing if identical to the first voucherNumber).',
    example: 'SV001_Duplicate',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  voucher_number?: string;

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
      'Original file name for the Base64 attachment (e.g., sales_contract.pdf).',
    example: 'sales_contract.pdf',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  originalFileName?: string;
}
