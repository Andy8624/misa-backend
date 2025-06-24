// Response DTO
import { Expose, Transform } from 'class-transformer';

export class ResponseAssetDepreciationInfoDto {
  @Expose()
  id: string;

  @Expose()
  originalCost?: number;

  @Expose()
  depreciationRateMonth?: number;

  @Expose()
  depreciationValue?: number;

  @Expose()
  depreciationMonth?: number;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  startDepreciationDate?: Date;

  @Expose()
  accumulatedDepreciation?: number;

  @Expose()
  usefulLife?: number;

  @Expose()
  usefulLifeUnit?: string;

  @Expose()
  isTaxLimited?: boolean;

  @Expose()
  assetIncrementId?: string;

  @Expose()
  originalCostAccountId?: string;

  @Expose()
  depreciationAccountId?: string;

  @Expose()
  companyId?: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  updatedAt?: Date;
}
