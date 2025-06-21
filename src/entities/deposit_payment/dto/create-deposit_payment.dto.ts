import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDepositPaymentDto {
  @Expose()
  @IsOptional()
  depositPaymentType?: string;

  @Expose()
  @IsOptional()
  paymentMethod?: string;

  @Expose()
  @IsOptional()
  paymentBankName?: string;

  @Expose()
  @IsOptional()
  address?: string;

  @Expose()
  @IsOptional()
  receipBankName?: string;

  @Expose()
  @IsOptional()
  description?: string;

  @Expose()
  @IsOptional()
  idCardNo?: string;

  @Expose()
  @IsOptional()
  issuedBy?: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  issuedDate?: Date;

  @Expose()
  @IsOptional()
  voucherNumber?: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  voucherDate?: Date;

  @Expose()
  @IsOptional()
  employee?: string;

  @Expose()
  @IsOptional()
  employeeByType?: string;

  @Expose()
  @IsOptional()
  bank?: string;

  @Expose()
  @IsOptional()
  supplier?: string;

  @Expose()
  @IsOptional()
  subject?: string;

  @Expose()
  @IsOptional()
  attached?: string;

  @Expose()
  @IsNotEmpty()
  companyId: string;
}
