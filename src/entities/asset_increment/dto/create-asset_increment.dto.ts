import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateAssetIncrementDto {
  @Expose()
  @IsOptional()
  voucherNumber?: string; // Số chứng từ ghi tăng

  @Expose()
  @IsOptional()
  @Transform(({ value }) =>
    value instanceof Date ? value.toISOString() : value,
  )
  incrementDate?: Date; // Ngày ghi tăng

  @Expose()
  @IsOptional()
  assetType?: string; // Loại tài sản

  @Expose()
  @IsOptional()
  assetCode?: string; // Mã tài sản

  @Expose()
  @IsOptional()
  assetName?: string; // Tên tài sản

  @Expose()
  @IsOptional()
  isDepreciable?: boolean; // Có tính khấu hao không

  @Expose()
  @IsOptional() // Đánh dấu là optional theo yêu cầu của bạn
  departmentId?: string; // Đơn vị sử dụng (FK tới Department)

  @Expose()
  @IsOptional()
  companyId?: string; // Quan hệ với bảng công ty
}
