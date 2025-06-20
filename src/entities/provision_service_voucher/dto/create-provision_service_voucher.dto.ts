import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateProvisionServiceVoucherDto {
  @Expose()
  @IsOptional()
  voucherNumber?: string;

  @Expose()
  @IsOptional()
  paymentStatus?: string;

  @Expose()
  @IsOptional()
  paymentMethod?: string;

  @Expose()
  @IsOptional()
  withInvoice?: string;

  @Expose()
  @IsOptional()
  isSubstituteInvoice?: string;

  @Expose()
  @IsOptional()
  other_t_and_c?: string;

  @Expose()
  @IsOptional()
  e_invoice_search_id?: string;

  @Expose()
  @IsOptional()
  e_invoice_search_url?: string;

  @Expose()
  @IsOptional()
  attached?: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  postDate?: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  voucherDate?: Date;

  @Expose()
  @IsOptional()
  paymentTAndC?: string;

  @Expose()
  @IsOptional()
  payWithinDay?: number;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  dueDate?: Date;

  @Expose()
  @IsOptional()
  cash_receipt_customer_id?: string;

  @Expose()
  @IsOptional()
  cash_receipt_customer_name?: string;

  @Expose()
  @IsOptional()
  cash_receipt_address?: string;

  @Expose()
  @IsOptional()
  cash_receipt_back_account?: string;

  @Expose()
  @IsOptional()
  cash_receipt_back_name?: string;

  @Expose()
  @IsOptional()
  cashReceiptStoreperson?: string;

  @Expose()
  @IsOptional()
  cash_receipt_particular?: string;

  @Expose()
  @IsOptional()
  debtVoucherCustomer?: string;

  @Expose()
  @IsOptional()
  debt_voucher_customer_name?: string;

  @Expose()
  @IsOptional()
  debt_voucher_contact?: string;

  @Expose()
  @IsOptional()
  debt_voucher_tax_code?: string;

  @Expose()
  @IsOptional()
  debt_voucher_address?: string;

  @Expose()
  @IsOptional()
  debtVoucherStoreperson?: string;

  @Expose()
  @IsOptional()
  debt_voucher_description?: string;

  @Expose()
  @IsOptional()
  invoiceCustomer?: string;

  @Expose()
  @IsOptional()
  invoice_customer_name?: string;

  @Expose()
  @IsOptional()
  invoice_tax_code?: string;

  @Expose()
  @IsOptional()
  invoice_purchaser?: string;

  @Expose()
  @IsOptional()
  invoice_payment_method?: string;

  @Expose()
  @IsOptional()
  invoice_bank_account?: string;

  @Expose()
  @IsOptional()
  invoice_address?: string;

  @Expose()
  @IsOptional()
  invoice_sign?: string;

  @Expose()
  @IsOptional()
  invoice_form?: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  invoice_date?: Date;

  @Expose()
  @IsOptional()
  invoice_number?: string;

  @Expose()
  @IsOptional()
  cash_receipt_voucher_customer_id?: string;

  @Expose()
  @IsOptional()
  cash_receipt_voucher_customer_name?: string;

  @Expose()
  @IsOptional()
  cash_receipt_voucher_address?: string;

  @Expose()
  @IsOptional()
  cash_receipt_voucher_payer?: string;

  @Expose()
  @IsOptional()
  cash_receipt_voucher_storeperson?: string;

  @Expose()
  @IsOptional()
  cash_receipt_voucher_particular?: string;

  @Expose()
  @IsOptional()
  cash_receipt_voucher_with_original_voucher?: number;

  @Expose()
  @IsOptional()
  percent_discount_invoice_value?: number;

  @Expose()
  @IsOptional()
  discount_type?: string;

  @Expose()
  @IsOptional()
  customer?: string;

  @Expose()
  @IsOptional()
  customer_name?: string;

  @Expose()
  @IsOptional()
  customer_tax_code?: string;

  @Expose()
  @IsOptional()
  customer_address?: string;
}
