import { Expose, Transform, Type } from 'class-transformer'; // Thêm Type
import { ResponseAssetComponentDto } from 'src/entities/asset_component/dto/response-asset_component.dto';
import { ResponseAssetAllocationDto } from 'src/entities/asset_allocation/dto/response-asset_allocation.dto';
import { ResponseAssetFormationOriginDto } from 'src/entities/asset_formation_origin/dto/response-asset_formation_origin.dto';
import { ResponseAssetAccessoryDto } from 'src/entities/asset_accessory/dto/response-asset_accessory.dto';
import { ResponseAssetDepreciationInfoDto } from 'src/entities/asset_depreciation_info/dto/response-asset_depreciation_info.dto';

export class ResponseAssetIncrementDto {
  @Expose()
  id: string;

  @Expose()
  voucherNumber?: string; // Số chứng từ ghi tăng

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  incrementDate?: Date; // Ngày ghi tăng

  @Expose()
  assetType?: string; // Loại tài sản

  @Expose()
  assetCode?: string; // Mã tài sản

  @Expose()
  assetName?: string; // Tên tài sản

  @Expose()
  isDepreciable?: boolean; // Có tính khấu hao không

  @Expose()
  departmentId?: string; // Đơn vị sử dụng (FK tới Department)

  @Expose()
  companyId?: string; // Quan hệ với bảng công ty

  @Expose()
  @Type(() => ResponseAssetDepreciationInfoDto) // Định nghĩa kiểu cho mảng con
  AssetDepreciationInfo_AssetIncrement?: ResponseAssetDepreciationInfoDto[];

  @Expose()
  @Type(() => ResponseAssetAllocationDto) // Định nghĩa kiểu cho mảng con
  AssetAllocation_AssetIncrement?: ResponseAssetAllocationDto[];

  @Expose()
  @Type(() => ResponseAssetComponentDto) // Định nghĩa kiểu cho mảng con
  AssetComponent_AssetIncrement?: ResponseAssetComponentDto[];

  @Expose()
  @Type(() => ResponseAssetAccessoryDto) // Định nghĩa kiểu cho mảng con
  AssetAccessory_AssetIncrement?: ResponseAssetAccessoryDto[];

  @Expose()
  @Type(() => ResponseAssetFormationOriginDto) // Định nghĩa kiểu cho mảng con
  AssetFormationOrigin_AssetIncrement?: ResponseAssetFormationOriginDto[];

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  updatedAt?: Date;
}
