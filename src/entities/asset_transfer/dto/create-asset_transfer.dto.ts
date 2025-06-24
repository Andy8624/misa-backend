import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateAssetTransferDto {
  @Expose()
  @IsOptional()
  transferNumber?: string; // Biên bản giao nhận số

  @Expose()
  @IsOptional()
  @Transform(({ value }) => value?.toISOString())
  transferDate?: Date; // Ngày

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
}
