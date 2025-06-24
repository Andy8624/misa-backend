import { Expose, Transform, Type } from 'class-transformer';
import { ResponseAssetTransferDetailDto } from 'src/entities/asset_transfer_detail/dto/response-asset_transfer_detail.dto';

export class ResponseAssetTransferDto {
  @Expose()
  id: string;

  @Expose()
  transferNumber?: string; // Biên bản giao nhận số

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  transferDate?: Date; // Ngày

  @Expose()
  reason?: string; // Lý do điều chuyển

  @Expose()
  deliveredById?: string; // Người bàn giao

  @Expose()
  receivedById?: string; // Người tiếp nhận

  @Expose()
  @Type(() => ResponseAssetTransferDetailDto)
  AssetTransferDetail_AssetTransfer?: ResponseAssetTransferDetailDto[];

  @Expose()
  companyId?: string; // Quan hệ với bảng công ty

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  updatedAt?: Date;
}
