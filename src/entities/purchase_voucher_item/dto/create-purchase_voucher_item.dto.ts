import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreatePurchaseVoucherItemDto {
  @Expose()
  @IsOptional()
  purchase_voucher?: string;

  @Expose()
  @IsOptional()
  item_id?: string;

  @Expose()
  @IsOptional()
  item_name?: string;

  @Expose()
  @IsOptional()
  cost_account?: string;

  @Expose()
  @IsOptional()
  account_payable?: string;

  @Expose()
  @IsOptional()
  cash_account?: string;

  @Expose()
  @IsOptional()
  inventory_account?: string;

  @Expose()
  @IsOptional()
  unit?: string;

  @Expose()
  @IsOptional()
  quantity?: number;

  @Expose()
  @IsOptional()
  unit_price?: number;

  @Expose()
  @IsOptional()
  vat?: string;

  @Expose()
  @IsOptional()
  vat_account?: string;

  @Expose()
  @IsOptional()
  purchase_cost?: number;

  @Expose()
  @IsOptional()
  pre_custom_cost?: number;

  @Expose()
  @IsOptional()
  group_of_purchased_goods?: string;

  @Expose()
  @IsOptional()
  discount_rate?: string;

  @Expose()
  @IsOptional()
  warehouse?: string;

  @Expose()
  @IsOptional()
  automatically_calculate?: string;

  @Expose()
  @IsOptional()
  pre_customs_cost_in_accounting_currency?: string;

  @Expose()
  @IsOptional()
  pre_customs_cost_in_foreign_currency?: string;

  @Expose()
  @IsOptional()
  custom_exchange_rate?: string;

  @Expose()
  @IsOptional()
  import_tax_rate?: string;

  @Expose()
  @IsOptional()
  import_tax_account?: string;

  @Expose()
  @IsOptional()
  special_consumption_tax_rate?: string;

  @Expose()
  @IsOptional()
  special_consumption_tax_account?: string;

  @Expose()
  @IsOptional()
  vat_description?: string;

  @Expose()
  @IsOptional()
  vat_corresponding_account?: string;

  @Expose()
  @IsOptional()
  fob?: number;
}
