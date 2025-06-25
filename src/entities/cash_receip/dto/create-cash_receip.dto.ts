import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateCashReceipDto {
  @Expose()
  @IsOptional()
  cashReceiptVoucherType?: string;

  @Expose()
  @IsOptional()
  payer?: string;

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
  reason?: string;

  @Expose()
  @IsOptional()
  withOriginalVoucher?: string;

  @Expose()
  @IsOptional()
  employee?: string;

  @Expose()
  @IsOptional()
  subject?: string;

  @Expose()
  @IsOptional()
  customer?: string;

  @Expose()
  @IsOptional()
  companyId: string;

  @Expose()
  @IsOptional()
  circularId: string;
}
