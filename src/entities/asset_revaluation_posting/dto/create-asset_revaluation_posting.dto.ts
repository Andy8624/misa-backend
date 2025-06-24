import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateAssetRevaluationPostingDto {
  @Expose()
  @IsOptional()
  description?: string; // Diễn giải

  @Expose()
  @IsOptional()
  amount?: number; // Số tiền

  @Expose()
  @IsOptional()
  costItem?: string; // Khoản mục CP

  @Expose()
  @IsOptional()
  project?: string; // Công trình

  @Expose()
  @IsOptional()
  thcpObject?: string; // Đối tượng THCP

  @Expose()
  @IsOptional()
  departmentId?: string;

  @Expose()
  @IsOptional()
  objectId?: string;

  @Expose()
  @IsOptional()
  debitAccountId?: string;

  @Expose()
  @IsOptional()
  creditAccountId?: string;

  @Expose()
  @IsOptional()
  assetRevaluationId?: string;

  @Expose()
  @IsOptional()
  companyId?: string; // Quan hệ với bảng công ty
}
