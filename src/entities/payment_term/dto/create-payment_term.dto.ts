import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePaymentTermDto {
  @Expose()
  @IsOptional()
  code?: string;

  @Expose()
  @IsOptional()
  name?: string;

  @Expose()
  @IsNotEmpty()
  companyId: string;
}
