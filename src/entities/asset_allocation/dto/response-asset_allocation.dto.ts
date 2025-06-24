// Response DTO
import { Expose, Transform } from 'class-transformer';

export class ResponseAssetAllocationDto {
  @Expose()
  id: string;

  @Expose()
  ratioPercent?: number;

  @Expose()
  costItem?: string;

  @Expose()
  statisticCode?: string;

  @Expose()
  assetIncrementId?: string;

  @Expose()
  expenseAccountId?: string;

  @Expose()
  objectId?: string;

  @Expose()
  companyId?: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  updatedAt?: Date;
}
