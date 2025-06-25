import { Expose, Transform, Type } from 'class-transformer';
import { ResponseAssetWriteOffAssetDto } from 'src/entities/asset_write_off_asset/dto/response-asset_write_off_asset.dto';
import { ResponseAssetWriteOffAccountingDto } from 'src/entities/asset_write_off_accounting/dto/response-asset_write_off_accounting.dto';
import { ResponseVoucherDto } from 'src/entities/voucher/dto/response-voucher.dto';

export class ResponseAssetWriteOffDto {
  @Expose()
  id: string;

  @Expose()
  reason?: string; // Lý do ghi giảm

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  postedDate?: Date; // Ngày hạch toán

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  voucherDate?: Date; // Ngày chứng từ

  @Expose()
  voucherNumber?: string; // Số chứng từ

  @Expose()
  @Type(() => ResponseAssetWriteOffAssetDto)
  assets?: ResponseAssetWriteOffAssetDto[];

  @Expose()
  @Type(() => ResponseAssetWriteOffAccountingDto)
  accountings?: ResponseAssetWriteOffAccountingDto[];

  @Expose()
  companyId?: string; // Quan hệ với bảng công ty

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  updatedAt?: Date;

  @Expose()
  circularId: string;

  @Expose()
  @Type(() => ResponseVoucherDto)
  voucher?: ResponseVoucherDto;
}
