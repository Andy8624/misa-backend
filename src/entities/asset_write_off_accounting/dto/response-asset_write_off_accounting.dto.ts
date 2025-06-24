import { Expose, Transform } from 'class-transformer';

export class ResponseAssetWriteOffAccountingDto {
  @Expose()
  id: string;

  @Expose()
  description?: string; // Diễn giải

  @Expose()
  amount?: number; // Số tiền

  @Expose()
  costItem?: string; // Khoản mục chi phí

  @Expose()
  assetWriteOffId?: string;

  @Expose()
  debitAccountId?: string; // Tài khoản nợ (FK ChartOfAccount)

  @Expose()
  creditAccountId?: string; // Tài khoản có (FK ChartOfAccount)

  @Expose()
  companyId?: string; // Quan hệ với bảng công ty

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  updatedAt?: Date;
}
