import { Expose, Transform } from 'class-transformer';

export class CreateVoucherDto {
  @Expose()
  voucherType: string;

  @Expose()
  @Transform(({ value }) => (value ? new Date(value) : undefined)) // Chuyển đổi string sang Date
  postedDate?: Date;

  @Expose()
  @Transform(({ value }) => (value ? new Date(value) : undefined)) // Chuyển đổi string sang Date
  voucherDate?: Date;

  @Expose()
  voucherNumber?: string;

  @Expose()
  companyId?: string;

  @Expose()
  circularId?: string;
}
