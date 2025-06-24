// Response DTO
import { Expose, Transform } from 'class-transformer';

export class ResponseAssetAccessoryDto {
  @Expose()
  id: string;

  @Expose()
  name?: string;

  @Expose()
  unit?: string;

  @Expose()
  quantity?: number;

  @Expose()
  value?: number;

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
