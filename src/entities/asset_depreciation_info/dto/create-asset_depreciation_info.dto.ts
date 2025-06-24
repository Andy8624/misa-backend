// Create DTO
import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateAssetDepreciationInfoDto {
  @Expose()
  @IsOptional()
  originalCost?: number;

  @Expose()
  @IsOptional()
  depreciationRateMonth?: number;

  @Expose()
  @IsOptional()
  depreciationValue?: number;

  @Expose()
  @IsOptional()
  depreciationMonth?: number;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  startDepreciationDate?: Date;

  @Expose()
  @IsOptional()
  accumulatedDepreciation?: number;

  @Expose()
  @IsOptional()
  usefulLife?: number;

  @Expose()
  @IsOptional()
  usefulLifeUnit?: string;

  @Expose()
  @IsOptional()
  isTaxLimited?: boolean;

  @Expose()
  @IsOptional()
  assetIncrementId?: string;

  @Expose()
  @IsOptional()
  originalCostAccountId?: string;

  @Expose()
  @IsOptional()
  depreciationAccountId?: string;

  @Expose()
  @IsOptional()
  companyId?: string;
}
