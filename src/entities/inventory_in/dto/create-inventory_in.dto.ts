import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateInventoryInDto {
  @Expose()
  @IsOptional()
  inventoryInVoucherType?: string;

  @Expose()
  @IsOptional()
  address?: string;

  @Expose()
  @IsOptional()
  courier?: string; // Người giao hàng

  @Expose()
  @IsOptional()
  description?: string;

  @Expose()
  @IsOptional()
  withOriginalVoucher?: string;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => value.toISOString())
  postedDate: Date;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => value.toISOString())
  voucherDate?: Date;

  @Expose()
  @IsNotEmpty({ message: 'Số chứng từ không được để trống' })
  voucherNumber: string;

  @Expose()
  @IsOptional()
  costOfInventoryReturned?: string;

  @Expose()
  @IsOptional()
  storePersonId?: string;

  @Expose()
  @IsOptional()
  clientId?: string;

  @Expose()
  @IsOptional()
  objectId?: string;

  @Expose()
  @IsNotEmpty({ message: 'ID Công ty không được để trống' })
  customerId: string;
}

// {
//   "inventoryInVoucherType": "Loại phiếu nhập",
//   "address": "Địa chỉ",
//   "courier": "KD",
//   "description": "Mô trả",
//   "withOriginalVoucher": "12",
//   "postedDate": "2025-06-19T07:27:38.867Z",
//   "voucherDate": "2025-06-19T07:27:38.867Z",
//   "voucherNumber": "string",
//   "costOfInventoryReturned": "string",
//   "storePersonId": null,
//   "clientId": null,
//   "objectId": null,
//   "customerId": "0f3767ae-8f5d-4ece-8f95-011d12429d5f"
// }
