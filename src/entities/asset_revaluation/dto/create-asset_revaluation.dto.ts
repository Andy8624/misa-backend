import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateAssetRevaluationDto {
  @Expose()
  @IsOptional()
  revaluationCode?: string; // Biên bản số

  @Expose()
  @IsOptional()
  @Transform(({ value }) =>
    value instanceof Date ? value.toISOString() : value,
  )
  revaluationDate?: Date; // Ngày

  @Expose()
  @IsOptional()
  reason?: string; // Lý do

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
