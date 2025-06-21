import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDepositReceipDto {
  @Expose()
  @IsOptional()
  depositReceipType?: string;

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
  address?: string;

  @Expose()
  @IsOptional()
  reason?: string;

  @Expose()
  @IsOptional()
  bankName?: string;

  @Expose()
  @IsOptional()
  debtCollector?: string;

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
  bank?: string;

  @Expose()
  @IsNotEmpty()
  companyId: string;
}
