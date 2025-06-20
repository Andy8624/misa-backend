import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateCashPaymentVoucherItemDto {
  @Expose()
  @IsOptional()
  amount?: number;

  @Expose()
  @IsOptional()
  description?: string;

  @Expose()
  @IsOptional()
  cashPayment?: string;

  @Expose()
  @IsOptional()
  subject?: string;

  @Expose()
  @IsOptional()
  debitAccount?: string;

  @Expose()
  @IsOptional()
  creditAccount?: string;

  @Expose()
  @IsOptional()
  bank?: string;
}
