import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateSaleVoucherItemDto {
  @Expose()
  @IsOptional()
  sales_voucher?: string;

  @Expose()
  @IsOptional()
  item_id?: string;

  @Expose()
  @IsOptional()
  item_name?: string;

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
  unit_cost_of_sales?: number;

  @Expose()
  @IsOptional()
  cost_of_goods_sold?: number;

  @Expose()
  @IsOptional()
  vat?: string;

  @Expose()
  @IsOptional()
  export_taxed_value?: number;

  @Expose()
  @IsOptional()
  percent_export_tax?: number;

  @Expose()
  @IsOptional()
  discount_rate?: number;

  @Expose()
  @IsOptional()
  warehouse?: string;

  @Expose()
  @IsOptional()
  expense_account?: string;

  @Expose()
  @IsOptional()
  inventory_account?: string;

  @Expose()
  @IsOptional()
  creditAccountId?: string;

  @Expose()
  @IsOptional()
  debitAccountId?: string;

  @Expose()
  @IsOptional()
  cashAccountId?: string;

  @Expose()
  @IsOptional()
  liabilityAccountId?: string;

  @Expose()
  @IsOptional()
  liability_account_or_expense_account_id?: string;

  @Expose()
  @IsOptional()
  sales_account_id?: string;

  @Expose()
  @IsOptional()
  export_tax_account_id?: string;
}
