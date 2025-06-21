import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateServicePurchaseVoucherDto {
  @Expose()
  @IsOptional()
  idCardNo?: string;

  @Expose()
  @IsOptional()
  paymentMethod?: string;

  @Expose()
  @IsOptional()
  paymentStatus?: string;

  @Expose()
  @IsOptional()
  paymentAccountBankName?: string;

  @Expose()
  @IsOptional()
  paymentDetail?: string;

  @Expose()
  @IsOptional()
  invoiceInclusion?: string;

  @Expose()
  @IsOptional()
  description?: string;

  @Expose()
  @IsOptional()
  receipient?: string;

  @Expose()
  @IsOptional()
  particular?: string;

  @Expose()
  @IsOptional()
  quantityOriginalVoucher?: string;

  @Expose()
  @IsOptional()
  recipient?: string;

  @Expose()
  @IsOptional()
  recipientAccountName?: string;

  @Expose()
  @IsOptional()
  supplierName?: string;

  @Expose()
  @IsOptional()
  supplierAddress?: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  issuedDate?: Date;

  @Expose()
  @IsOptional()
  issuedBy?: string;

  @Expose()
  @IsOptional()
  payWithInDays?: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  dueDate?: Date;

  @Expose()
  @IsOptional()
  cashPaymentVoucherNo?: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  cashPaymentVoucherDate?: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  postedDate?: Date;

  @Expose()
  @IsOptional()
  voucherNumber?: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  voucherDate?: Date;

  @Expose()
  @IsOptional()
  purchase_without_invoiceInfo_supplier_name?: string;

  @Expose()
  @IsOptional()
  purchase_without_invoiceInfo_id_card_no?: string;

  @Expose()
  @IsOptional()
  purchase_without_invoiceInfo_address?: string;

  @Expose()
  @IsOptional()
  recipientAccount?: string;

  @Expose()
  @IsOptional()
  supplier?: string;

  @Expose()
  @IsOptional()
  purchasingStaff?: string;

  @Expose()
  @IsOptional()
  paymentAccount?: string;

  @Expose()
  @IsOptional()
  paymentTerm?: string;

  @Expose()
  @IsNotEmpty()
  customerId: string;
}
