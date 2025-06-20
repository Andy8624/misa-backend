import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateProvisionServiceVoucherItemDto {
  @Expose()
  @IsOptional()
  provisionServiceVoucher?: string;

  @Expose()
  @IsOptional()
  item_id?: string;

  @Expose()
  @IsOptional()
  itemName?: string;

  @Expose()
  @IsOptional()
  unit?: string;

  @Expose()
  @IsOptional()
  quantity?: number;

  @Expose()
  @IsOptional()
  unitPrice?: number;

  @Expose()
  @IsOptional()
  vat?: string;

  @Expose()
  @IsOptional()
  discountRate?: number;

  @Expose()
  @IsOptional()
  creditAccountId?: string;

  @Expose()
  @IsOptional()
  debitAccountId?: string;

  @Expose()
  @IsOptional()
  discountAccountId?: string;

  @Expose()
  @IsOptional()
  vatAccountId?: string;
}
