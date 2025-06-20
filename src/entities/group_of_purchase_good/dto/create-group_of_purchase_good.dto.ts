import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

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
}
