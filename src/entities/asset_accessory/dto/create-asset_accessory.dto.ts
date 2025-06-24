// Create DTO
import { Expose } from 'class-transformer';
import { IsOptional, IsInt, IsNumber } from 'class-validator';

export class CreateAssetAccessoryDto {
  @Expose()
  @IsOptional()
  name?: string;

  @Expose()
  @IsOptional()
  unit?: string;

  @Expose()
  @IsOptional()
  @IsInt()
  quantity?: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  value?: number;

  @Expose()
  @IsOptional()
  assetIncrementId?: string;

  @Expose()
  @IsOptional()
  companyId?: string;
}
