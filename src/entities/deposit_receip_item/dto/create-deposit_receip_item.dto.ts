import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateDepositReceipItemDto {
  @Expose()
  @IsOptional()
  description?: string;

  @Expose()
  @IsOptional()
  ammount?: number;

  @Expose()
  @IsOptional()
  depositReceip?: string;

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
