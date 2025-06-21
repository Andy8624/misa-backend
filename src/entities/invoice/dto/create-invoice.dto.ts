import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateInvoiceDto {
  @Expose()
  @IsOptional()
  type?: string;

  @Expose()
  @IsOptional()
  verificationStatus?: string;

  @Expose()
  @IsOptional()
  code?: string;

  @Expose()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsOptional()
  invoiceDate?: Date;

  @Expose()
  @IsOptional()
  taxId?: string;

  @Expose()
  @IsOptional()
  invoiceNumber?: string;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => (value ? BigInt(value) : undefined), {
    toClassOnly: true,
  })
  goodAmount?: bigint;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => (value ? BigInt(value) : undefined), {
    toClassOnly: true,
  })
  taxAmount?: bigint;

  @Expose()
  @IsOptional()
  partnerName?: string;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => (value ? BigInt(value) : undefined), {
    toClassOnly: true,
  })
  totalPaymentAmmount?: bigint;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => (value ? BigInt(value) : undefined), {
    toClassOnly: true,
  })
  invoiceValue?: bigint;

  @Expose()
  @IsOptional()
  formNumber?: string;

  @Expose()
  @IsOptional()
  invoiceType?: string;

  @Expose()
  @IsOptional()
  invoiceStatus?: string;

  @Expose()
  @IsOptional()
  invoiceVerificationResult?: string;

  @Expose()
  @IsOptional()
  verificationCondition?: string;

  @Expose()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsOptional()
  lastVerificationTime?: Date;

  @Expose()
  @IsOptional()
  accountingStatus?: string;

  @Expose()
  @IsOptional()
  accountingDocument?: string;

  @Expose()
  @IsOptional()
  invoiceSource?: string;

  @Expose()
  @IsOptional()
  executinPerson?: string;

  @Expose()
  @IsOptional()
  file?: string;

  @Expose()
  @IsNotEmpty()
  customerId: string;
}
