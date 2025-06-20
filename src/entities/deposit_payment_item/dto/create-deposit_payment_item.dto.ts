import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateDepositPaymentItemDto {
  @Expose()
  @IsOptional()
  description?: string;

  @Expose()
  @IsOptional()
  ammount?: number;

  @Expose()
  @IsOptional()
  depositPayment?: string;

  @Expose()
  @IsOptional()
  subject?: string;

  @Expose()
  @IsOptional()
  creditAccountId?: string;

  @Expose()
  @IsOptional()
  debitAccountId?: string;
}
