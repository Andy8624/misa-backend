import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateAssetWriteOffAccountingDto {
  @Expose()
  @IsOptional()
  description?: string; // Diễn giải

  @Expose()
  @IsOptional()
  amount?: number; // Số tiền

  @Expose()
  @IsOptional()
  costItem?: string; // Khoản mục chi phí

  @Expose()
  @IsOptional()
  assetWriteOffId?: string;

  @Expose()
  @IsOptional()
  debitAccountId?: string; // Tài khoản nợ (FK ChartOfAccount)

  @Expose()
  @IsOptional()
  creditAccountId?: string; // Tài khoản có (FK ChartOfAccount)

  @Expose()
  @IsOptional()
  companyId?: string; // Quan hệ với bảng công ty
}
