import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePurchaseVoucherDto {
  @Expose()
  @IsOptional()
  purchase_type?: string;

  @Expose()
  @IsOptional()
  voucher_number?: string;

  @Expose()
  @IsOptional()
  payment_status?: string;

  @Expose()
  @IsOptional()
  payment_method?: string;

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
  supplier?: string;

  @Expose()
  @IsOptional()
  supplier_name?: string;

  @Expose()
  @IsOptional()
  supplier_address?: string;

  @Expose()
  @IsOptional()
  supplier_tax_code?: string;

  @Expose()
  @IsOptional()
  courier?: string;

  @Expose()
  @IsOptional()
  purchasing_staff?: string;

  @Expose()
  @IsOptional()
  receipient?: string;

  @Expose()
  @IsOptional()
  quantity_original_number?: string;

  @Expose()
  @IsOptional()
  inventory_in_voucher_no?: string;

  @Expose()
  @IsOptional()
  recipient_account?: string;

  @Expose()
  @IsOptional()
  recipient_account_bank_name?: string;

  @Expose()
  @IsOptional()
  description?: string;

  @Expose()
  @IsOptional()
  payment_account?: string;

  @Expose()
  @IsOptional()
  payment_account_bank_name?: string;

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
  @IsOptional()
  inventory_in_voucher_particular?: string;

  @Expose()
  @IsOptional()
  cash_payment_voucher_particular?: string;

  @Expose()
  @IsOptional()
  debt_voucher_particular?: string;

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
  discount?: string;

  @Expose()
  @IsOptional()
  discount_rate?: string;

  @Expose()
  @IsOptional()
  personal_id_number?: string;

  @Expose()
  @IsOptional()
  issued_date?: string;

  @Expose()
  @IsOptional()
  issued_by?: string;

  @Expose()
  @IsOptional()
  invoice_inclusion?: string;

  @Expose()
  @IsNotEmpty()
  companyId: string;
}
