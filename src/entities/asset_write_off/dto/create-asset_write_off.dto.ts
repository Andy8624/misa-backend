import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateAssetWriteOffDto {
  @Expose()
  @IsOptional()
  reason?: string; // Lý do ghi giảm

  @Expose()
  @IsOptional()
  @Transform(({ value }) =>
    value instanceof Date ? value.toISOString() : value,
  )
  postedDate?: Date; // Ngày hạch toán

  @Expose()
  @IsOptional()
  @Transform(({ value }) =>
    value instanceof Date ? value.toISOString() : value,
  )
  voucherDate?: Date; // Ngày chứng từ

  @Expose()
  @IsOptional()
  voucherNumber?: string; // Số chứng từ

  @Expose()
  @IsOptional()
  companyId?: string; // Quan hệ với bảng công ty
}
