import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateAssetTransferDetailDto {
  @Expose()
  @IsOptional()
  assetId?: string; // FK đến tài sản

  @Expose()
  @IsOptional()
  fromDepartmentId?: string; // Từ đơn vị

  @Expose()
  @IsOptional()
  toDepartmentId?: string; // Đến đơn vị

  @Expose()
  @IsOptional()
  saleContract?: string; // Hợp đồng bán

  @Expose()
  @IsOptional()
  purchaseOrder?: string; // Đơn đặt hàng

  @Expose()
  @IsOptional()
  project?: string; // Công trình

  @Expose()
  @IsOptional()
  costItem?: string; // Khoản mục chi phí

  @Expose()
  @IsOptional()
  thcpObject?: string; // Đối tượng THCP

  @Expose()
  @IsOptional()
  expenseAccountId?: string; // Tài khoản chi phí

  @Expose()
  @IsOptional()
  assetTransferId?: string; // ID biên bản điều chuyển

  @Expose()
  @IsOptional()
  companyId?: string; // ID công ty
}
