import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateCashReceipVoucherItemDto {
  @Expose()
  @IsOptional()
  amount?: number;

  @Expose()
  @IsOptional()
  description?: string;

  @Expose()
  @IsOptional()
  cashReceip?: string;

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
