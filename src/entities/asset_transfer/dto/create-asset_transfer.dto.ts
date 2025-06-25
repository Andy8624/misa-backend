import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateAssetTransferDto {
  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  postedDate?: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  voucherDate?: Date;

  @Expose()
  @IsOptional()
  voucherNumber?: string;

  @Expose()
  @IsOptional()
  reason?: string; // Lý do điều chuyển

  @Expose()
  @IsOptional()
  deliveredById?: string; // Người bàn giao

  @Expose()
  @IsOptional()
  receivedById?: string; // Người tiếp nhận

  @Expose()
  @IsOptional()
  companyId?: string; // ID công ty

  @Expose()
  @IsOptional()
  circularId?: string;
}
