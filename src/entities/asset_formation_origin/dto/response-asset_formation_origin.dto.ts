// Response DTO
import { Expose, Transform } from 'class-transformer';

export class ResponseAssetFormationOriginDto {
  @Expose()
  id: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  voucherDate: Date;

  @Expose()
  voucherNumber: string;

  @Expose()
  description: string;

  @Expose()
  amount: number;

  @Expose()
  assetIncrementId?: string;

  @Expose()
  debitAccountId: string;

  @Expose()
  creditAccountId: string;

  @Expose()
  companyId?: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  updatedAt?: Date;
}
