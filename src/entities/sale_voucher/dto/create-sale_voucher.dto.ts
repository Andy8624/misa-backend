import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSaleVoucherDto {
  @Expose()
  @IsOptional()
  payment_status?: string;

  @Expose()
  @IsOptional()
  payment_method?: string;

  @Expose()
  @IsOptional()
  inventory_out_voucher_included?: string;

  @Expose()
  @IsOptional()
  with_invoice?: string;

  @Expose()
  @IsOptional()
  is_substitute_invoice?: string;

  @Expose()
  @IsOptional()
  pick_up_location?: string;

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
  posted_date?: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  voucher_date?: Date;

  @Expose()
  @IsOptional()
  payment_t_and_c?: string;

  @Expose()
  @IsOptional()
  pay_within_days?: number;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  due_date?: Date;

  @Expose()
  @IsOptional()
  contract_number?: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  contract_date?: Date;

  @Expose()
  @IsOptional()
  b_l_no?: string;

  @Expose()
  @IsOptional()
  container_no?: string;

  @Expose()
  @IsOptional()
  export_pick_up_location?: string;

  @Expose()
  @IsOptional()
  shipping_provider?: string;

  @Expose()
  @IsOptional()
  discount_type?: string;

  @Expose()
  @IsOptional()
  percent_discount_invoice_value?: string;

  @Expose()
  @IsOptional()
  invoice_customer_id?: string;

  @Expose()
  @IsOptional()
  invoice_customer_name?: string;

  @Expose()
  @IsOptional()
  invoice_tax_code?: string;

  @Expose()
  @IsOptional()
  invoice_address?: string;

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
  invoice_form?: string;

  @Expose()
  @IsOptional()
  invoice_sign?: string;

  @Expose()
  @IsOptional()
  invoice_number?: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  invoice_date?: Date;

  @Expose()
  @IsOptional()
  inventory_out_voucher_customer_id?: string;

  @Expose()
  @IsOptional()
  inventory_out_voucher_customer_name?: string;

  @Expose()
  @IsOptional()
  inventory_out_voucher_receipient?: string;

  @Expose()
  @IsOptional()
  inventory_out_voucher_address?: string;

  @Expose()
  @IsOptional()
  inventory_out_voucher_storeperson?: string;

  @Expose()
  @IsOptional()
  inventory_out_voucher_particular?: string;

  @Expose()
  @IsOptional()
  inventory_out_voucher_with_original_voucher?: string;

  @Expose()
  @IsOptional()
  debt_voucher_customer_id?: string;

  @Expose()
  @IsOptional()
  debt_voucher_customer_name?: string;

  @Expose()
  @IsOptional()
  debt_voucher_tax_code?: string;

  @Expose()
  @IsOptional()
  debt_voucher_address?: string;

  @Expose()
  @IsOptional()
  debt_voucher_contact?: string;

  @Expose()
  @IsOptional()
  debt_voucher_storeperson?: string;

  @Expose()
  @IsOptional()
  debt_voucher_description?: string;

  @Expose()
  @IsOptional()
  debt_voucher_principal?: string;

  @Expose()
  @IsOptional()
  debt_voucher_trustor?: string;

  @Expose()
  @IsOptional()
  cash_receipt_customer_id?: string;

  @Expose()
  @IsOptional()
  cash_receipt_customer_name?: string;

  @Expose()
  @IsOptional()
  cash_receipt_customer_address?: string;

  @Expose()
  @IsOptional()
  cash_receipt_cash_in_bank_receipt?: string;

  @Expose()
  @IsOptional()
  cash_receipt_bank_name?: string;

  @Expose()
  @IsOptional()
  cash_receipt_storeperson?: string;

  @Expose()
  @IsOptional()
  cash_receipt_particular?: string;

  @Expose()
  @IsOptional()
  cash_receipt_principal?: string;

  @Expose()
  @IsOptional()
  cash_receipt_voucher_customer_id?: string;

  @Expose()
  @IsOptional()
  cash_receipt_voucher_customer_name?: string;

  @Expose()
  @IsOptional()
  cash_receipt_voucher_payer?: string;

  @Expose()
  @IsOptional()
  cash_receipt_voucher_storeperson?: string;

  @Expose()
  @IsOptional()
  cash_receipt_voucher_address?: string;

  @Expose()
  @IsOptional()
  cash_receipt_voucher_with_original_voucher?: string;

  @Expose()
  @IsOptional()
  cash_receipt_voucher_particular?: string;

  @Expose()
  @IsOptional()
  cash_receipt_voucher_principal?: string;

  @Expose()
  @IsOptional()
  customer?: string;

  @Expose()
  @IsOptional()
  customer_name?: string;

  @Expose()
  @IsOptional()
  sales_voucher?: string;

  @Expose()
  @IsOptional()
  customer_tax_code?: string;

  @Expose()
  @IsOptional()
  customer_address?: string;

  @Expose()
  @IsOptional()
  voucher_number?: string;

  @Expose()
  @IsNotEmpty()
  companyId: string;
}
