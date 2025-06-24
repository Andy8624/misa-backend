import { Expose, Transform, Type } from 'class-transformer';
import { ResponseAssetRevaluationDetailDto } from 'src/entities/asset_revaluation_detail/dto/response-asset_revaluation_detail.dto';
import { ResponseAssetRevaluationPostingDto } from 'src/entities/asset_revaluation_posting/dto/response-asset_revaluation_posting.dto';

export class ResponseAssetRevaluationDto {
  @Expose()
  id: string;

  @Expose()
  revaluationCode?: string; // Biên bản số

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  revaluationDate?: Date; // Ngày

  @Expose()
  reason?: string; // Lý do

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  postedDate?: Date; // Ngày hạch toán

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  voucherDate?: Date; // Ngày chứng từ

  @Expose()
  voucherNumber?: string; // Số chứng từ

  @Expose()
  @Type(() => ResponseAssetRevaluationDetailDto) // Định nghĩa kiểu cho mảng con
  details?: ResponseAssetRevaluationDetailDto[];

  @Expose()
  @Type(() => ResponseAssetRevaluationPostingDto) // Định nghĩa kiểu cho mảng con
  postings?: ResponseAssetRevaluationPostingDto[];

  @Expose()
  companyId?: string; // Quan hệ với bảng công ty

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  updatedAt?: Date;
}
