import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateAssetDto {
  @Expose()
  @IsOptional()
  assetCode?: string;

  @Expose()
  @IsOptional()
  assetName?: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  incrementDate?: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  depreciationDate?: Date;

  @Expose()
  @IsOptional()
  useTime?: number;

  @Expose()
  @IsOptional()
  useTimeRemain?: number;

  @Expose()
  @IsOptional()
  originalCost?: number;

  @Expose()
  @IsOptional()
  depreciationValue?: number;

  @Expose()
  @IsOptional()
  accumulatedDepreciation?: number;

  @Expose()
  @IsOptional()
  assetTypeId?: string;

  @Expose()
  @IsOptional()
  departmentId?: string;

  @Expose()
  @IsOptional()
  companyId: string;
}
