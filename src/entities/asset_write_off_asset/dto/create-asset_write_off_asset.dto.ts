import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateAssetWriteOffAssetDto {
  @Expose()
  @IsOptional()
  assetCode?: string; // Mã tài sản

  @Expose()
  @IsOptional()
  assetName?: string; // Tên tài sản

  @Expose()
  @IsOptional()
  originalCost?: number; // Nguyên giá

  @Expose()
  @IsOptional()
  accumulatedDepreciation?: number; // Hao mòn lũy kế

  @Expose()
  @IsOptional()
  depreciationValue?: number; // Giá trị khấu hao (có thể là hao mòn kỳ này)

  @Expose()
  @IsOptional()
  remainingValue?: number; // Giá trị còn lại

  @Expose()
  @IsOptional()
  assetWriteOffId?: string;

  @Expose()
  @IsOptional()
  departmentId?: string; // Đơn vị sử dụng (FK tới Department)

  @Expose()
  @IsOptional()
  accountOriginalCostId?: string; // Tài khoản nguyên giá (FK ChartOfAccount)

  @Expose()
  @IsOptional()
  accountDepreciationId?: string; // Tài khoản hao mòn (FK ChartOfAccount)

  @Expose()
  @IsOptional()
  accountRemainingValueId?: string; // Tài khoản xử lý giá trị còn lại (FK ChartOfAccount)

  @Expose()
  @IsOptional()
  companyId?: string; // Quan hệ với bảng công ty
}
