// Create DTO
import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateAssetFormationOriginDto {
  @Expose()
  @IsOptional() // Thêm IsOptional cho trường này
  @Transform(({ value }) =>
    value instanceof Date ? value.toISOString() : value,
  )
  voucherDate?: Date; // Ngày chứng từ

  @Expose()
  @IsOptional() // Thêm IsOptional cho trường này
  voucherNumber?: string; // Số chứng từ

  @Expose()
  @IsOptional() // Thêm IsOptional cho trường này
  description?: string; // Diễn giải

  @Expose()
  @IsOptional() // Thêm IsOptional cho trường này
  amount?: number; // Số tiền

  @Expose()
  @IsOptional()
  assetIncrementId?: string;

  @Expose()
  @IsOptional() // Thêm IsOptional cho trường này
  debitAccountId?: string; // Tài khoản nợ (FK ChartOfAccount)

  @Expose()
  @IsOptional() // Thêm IsOptional cho trường này
  creditAccountId?: string; // Tài khoản có (FK ChartOfAccount)

  @Expose()
  @IsOptional()
  companyId?: string; // Quan hệ với bảng công ty
}
