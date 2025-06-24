import { Expose } from 'class-transformer';

export class ResponseAssetTransferDetailDto {
  @Expose()
  id: string;

  @Expose()
  assetId: string; // FK đến tài sản

  @Expose()
  fromDepartmentId: string; // Từ đơn vị

  @Expose()
  toDepartmentId: string; // Đến đơn vị

  @Expose()
  saleContract: string; // Hợp đồng bán

  @Expose()
  purchaseOrder: string; // Đơn đặt hàng

  @Expose()
  project: string; // Công trình

  @Expose()
  costItem: string; // Khoản mục chi phí

  @Expose()
  thcpObject: string; // Đối tượng THCP

  @Expose()
  expenseAccountId: string; // Tài khoản chi phí

  @Expose()
  assetTransferId: string; // ID biên bản điều chuyển

  @Expose()
  companyId: string; // ID công ty

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
