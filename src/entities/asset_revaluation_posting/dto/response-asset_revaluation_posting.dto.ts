import { Expose, Transform } from 'class-transformer';

export class ResponseAssetRevaluationPostingDto {
  @Expose()
  id: string;

  @Expose()
  description?: string; // Diễn giải

  @Expose()
  amount?: number; // Số tiền

  @Expose()
  costItem?: string; // Khoản mục CP

  @Expose()
  project?: string; // Công trình

  @Expose()
  thcpObject?: string; // Đối tượng THCP

  @Expose()
  departmentId?: string;

  @Expose()
  objectId?: string;

  @Expose()
  debitAccountId?: string;

  @Expose()
  creditAccountId?: string;

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
