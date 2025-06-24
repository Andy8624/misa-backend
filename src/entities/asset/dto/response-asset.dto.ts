import { Expose, Transform } from 'class-transformer';

export class ResponseAssetDto {
  @Expose()
  id: string;

  @Expose()
  assetCode: string;

  @Expose()
  assetName: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  incrementDate: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  depreciationDate: Date;

  @Expose()
  useTime: number;

  @Expose()
  useTimeRemain: number;

  @Expose()
  originalCost: number;

  @Expose()
  depreciationValue: number;

  @Expose()
  accumulatedDepreciation: number;

  @Expose()
  assetTypeId: string;

  @Expose()
  departmentId: string;

  @Expose()
  customerId: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  updatedAt: Date;
}
