import { Expose, Transform } from 'class-transformer';

export class ResponseAssetRevaluationDetailDto {
  @Expose()
  id: string;

  @Expose()
  remainingValueBefore?: number; // Giá trị còn lại trước điều chỉnh

  @Expose()
  remainingValueAfter?: number; // Giá trị còn lại sau điều chỉnh

  @Expose()
  remainingValueDifference?: number; // Giá trị còn lại chênh lệch

  @Expose()
  remainingUseTimeBefore?: number; // Thời gian sử dụng còn lại - Trước

  @Expose()
  remainingUseTimeAfter?: number; // Thời gian sử dụng còn lại - Sau

  @Expose()
  remainingUseTimeDifference?: number; // Thời gian sử dụng còn lại - Chênh lệch

  @Expose()
  accumulatedDepreciationBefore?: number; // Hao mòn lũy kế - Trước

  @Expose()
  accumulatedDepreciationAfter?: number; // Hao mòn lũy kế - Sau

  @Expose()
  accumulatedDepreciationDifference?: number; // Hao mòn lũy kế - Chênh lệch

  @Expose()
  depreciationAccountId?: string; // Tài khoản chi phí hao mòn lũy kế

  @Expose()
  depreciationBaseBefore?: number; // Giá trị tính khấu hao - GTKH trước điều chỉnh

  @Expose()
  depreciationBaseAfter?: number; // Giá trị tính khấu hao - GTKH sau điều chỉnh

  @Expose()
  depreciationBaseDifference?: number; // Giá trị tính khấu hao - GTKH chênh lệch

  @Expose()
  depreciationBaseAccountId?: string; // Tài khoản đánh giá lại của GTKH

  @Expose()
  depreciationMonthValueAfter?: number; // GTKH tháng sau điều chỉnh

  @Expose()
  depreciationMonthValueLegalAfter?: number; // GTKH tháng theo luật sau điều chỉnh

  @Expose()
  assetId?: string;

  @Expose()
  departmentId?: string;

  @Expose()
  assetRevaluationId?: string;

  @Expose()
  companyId?: string; // Quan hệ với bảng công ty

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  updatedAt?: Date;
}
