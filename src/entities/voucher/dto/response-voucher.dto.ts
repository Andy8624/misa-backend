import { Expose, Transform } from 'class-transformer';

export class ResponseVoucherDto {
  @Expose()
  id: string;

  @Expose()
  voucherType: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  postedDate?: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  voucherDate?: Date;

  @Expose()
  voucherNumber?: string;

  @Expose()
  companyId?: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  updatedAt?: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  deletedAt?: Date;
}
