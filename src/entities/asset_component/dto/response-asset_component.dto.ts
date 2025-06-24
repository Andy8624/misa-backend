// Response DTO
import { Expose, Transform } from 'class-transformer';

export class ResponseAssetComponentDto {
  @Expose()
  id: string;

  @Expose()
  name?: string;

  @Expose()
  unitId?: string;

  @Expose()
  quantity?: number;

  @Expose()
  warrantyPeriod?: number;

  @Expose()
  assetIncrementId?: string;

  @Expose()
  companyId?: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  updatedAt?: Date;
}
