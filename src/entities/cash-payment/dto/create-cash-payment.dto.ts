import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCashPaymentDto {
  @Expose()
  @IsOptional()
  cashPaymentVoucherType?: string;

  @Expose()
  @IsOptional()
  supplierName?: string;

  @Expose()
  @IsOptional()
  recipient?: string;

  @Expose()
  @IsOptional()
  withOriginalVoucher?: string;

  @Expose()
  @IsOptional()
  reason?: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  postedDate?: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  voucherDate?: Date;

  @Expose()
  @IsOptional()
  voucherNumber?: string;

  @Expose()
  @IsOptional()
  employee?: string;

  @Expose()
  @IsOptional()
  subject?: string;

  @Expose()
  @IsOptional()
  supplier?: string;

  @Expose()
  @IsNotEmpty()
  companyId: string;
}
