import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGroupOfPurchaseGoodDto {
  @Expose()
  @IsOptional()
  code?: string;

  @Expose()
  @IsOptional()
  name?: string;

  @Expose()
  @IsOptional()
  description?: string;

  @Expose()
  @IsNotEmpty()
  companyId: string;
}
