import { Expose, Transform } from 'class-transformer';

export class ResponseAssetWriteOffAssetDto {
  @Expose()
  id: string;

  @Expose()
  assetCode?: string; // Mã tài sản

  @Expose()
  assetName?: string; // Tên tài sản

  @Expose()
  originalCost?: number; // Nguyên giá

  @Expose()
  accumulatedDepreciation?: number; // Hao mòn lũy kế

  @Expose()
  depreciationValue?: number; // Giá trị khấu hao (có thể là hao mòn kỳ này)

  @Expose()
  remainingValue?: number; // Giá trị còn lại

  @Expose()
  assetWriteOffId?: string;

  @Expose()
  departmentId?: string; // Đơn vị sử dụng (FK tới Department)

  @Expose()
  accountOriginalCostId?: string; // Tài khoản nguyên giá (FK ChartOfAccount)

  @Expose()
  accountDepreciationId?: string; // Tài khoản hao mòn (FK ChartOfAccount)

  @Expose()
  accountRemainingValueId?: string; // Tài khoản xử lý giá trị còn lại (FK ChartOfAccount)

  @Expose()
  companyId?: string; // Quan hệ với bảng công ty

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  updatedAt?: Date;
}
