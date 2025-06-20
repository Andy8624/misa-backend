import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateServicePurchaseVoucherItemDto {
  @Expose()
  @IsOptional()
  itemName?: string;

  @Expose()
  @IsOptional()
  subjectName?: string;

  @Expose()
  @IsOptional()
  quantity?: number;

  @Expose()
  @IsOptional()
  unitPrice?: number;

  @Expose()
  @IsOptional()
  invoiceNumber?: string;

  @Expose()
  @IsOptional()
  invoiceDate?: string;

  @Expose()
  @IsOptional()
  vatDescription?: string;

  @Expose()
  @IsOptional()
  groupOfPurchasedGood?: string;

  @Expose()
  @IsOptional()
  supplierTaxCode?: string;

  @Expose()
  @IsOptional()
  supplierName?: string;

  @Expose()
  @IsOptional()
  supplierAddress?: string;

  @Expose()
  @IsOptional()
  vat?: string;

  @Expose()
  @IsOptional()
  subject?: string;

  @Expose()
  @IsOptional()
  vatAccount?: string;

  @Expose()
  @IsOptional()
  supplier?: string;

  @Expose()
  @IsOptional()
  creditAccountId?: string;

  @Expose()
  @IsOptional()
  debitAccountId?: string;

  @Expose()
  @IsOptional()
  itemId?: string;

  @Expose()
  @IsOptional()
  servicePurchaseVoucher?: string;

  @Expose()
  @IsOptional()
  unitId?: string;
}
