import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateVoucherAccountEntryDto {
  @Expose()
  @IsOptional()
  serviceVoucher?: string;

  @Expose()
  @IsOptional()
  type?: string;

  @Expose()
  @IsOptional()
  itemName?: string;

  @Expose()
  @IsOptional()
  itemId?: string;

  @Expose()
  @IsOptional()
  customerName?: string;

  @Expose()
  @IsOptional()
  unitPrice?: number;

  @Expose()
  @IsOptional()
  quantity?: number;

  @Expose()
  @IsOptional()
  creditAccountId?: string;

  @Expose()
  @IsOptional()
  debitAccountId?: string;

  @Expose()
  @IsOptional()
  subject?: string;

  @Expose()
  @IsOptional()
  unitId?: string;

  @Expose()
  @IsOptional()
  supplierName?: string;

  @Expose()
  @IsOptional()
  supplierAddress?: string;

  @Expose()
  @IsOptional()
  supplierTaxCode?: string;

  @Expose()
  @IsOptional()
  groupOfPurchasedGood?: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  invoiceDate?: Date;

  @Expose()
  @IsOptional()
  invoiceNumber?: string;

  @Expose()
  @IsOptional()
  vatDescription?: string;

  @Expose()
  @IsOptional()
  vatAccount?: string;

  @Expose()
  @IsOptional()
  supplier?: string;

  @Expose()
  @IsNotEmpty()
  customerId: string;
}
