import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateAssetRevaluationDetailDto {
  @Expose()
  @IsOptional()
  remainingValueBefore?: number; // Giá trị còn lại trước điều chỉnh

  @Expose()
  @IsOptional()
  remainingValueAfter?: number; // Giá trị còn lại sau điều chỉnh

  @Expose()
  @IsOptional()
  remainingValueDifference?: number; // Giá trị còn lại chênh lệch

  @Expose()
  @IsOptional()
  remainingUseTimeBefore?: number; // Thời gian sử dụng còn lại - Trước

  @Expose()
  @IsOptional()
  remainingUseTimeAfter?: number; // Thời gian sử dụng còn lại - Sau

  @Expose()
  @IsOptional()
  remainingUseTimeDifference?: number; // Thời gian sử dụng còn lại - Chênh lệch

  @Expose()
  @IsOptional()
  accumulatedDepreciationBefore?: number; // Hao mòn lũy kế - Trước

  @Expose()
  @IsOptional()
  accumulatedDepreciationAfter?: number; // Hao mòn lũy kế - Sau

  @Expose()
  @IsOptional()
  accumulatedDepreciationDifference?: number; // Hao mòn lũy kế - Chênh lệch

  @Expose()
  @IsOptional()
  depreciationAccountId?: string; // Tài khoản chi phí hao mòn lũy kế

  @Expose()
  @IsOptional()
  depreciationBaseBefore?: number; // Giá trị tính khấu hao - GTKH trước điều chỉnh

  @Expose()
  @IsOptional()
  depreciationBaseAfter?: number; // Giá trị tính khấu hao - GTKH sau điều chỉnh

  @Expose()
  @IsOptional()
  depreciationBaseDifference?: number; // Giá trị tính khấu hao - GTKH chênh lệch

  @Expose()
  @IsOptional()
  depreciationBaseAccountId?: string; // Tài khoản đánh giá lại của GTKH

  @Expose()
  @IsOptional()
  depreciationMonthValueAfter?: number; // GTKH tháng sau điều chỉnh

  @Expose()
  @IsOptional()
  depreciationMonthValueLegalAfter?: number; // GTKH tháng theo luật sau điều chỉnh

  @Expose()
  @IsOptional()
  assetId?: string;

  @Expose()
  @IsOptional()
  departmentId?: string;

  @Expose()
  @IsOptional()
  assetRevaluationId?: string;

  @Expose()
  @IsOptional()
  companyId?: string; // Quan hệ với bảng công ty
}
