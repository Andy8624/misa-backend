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
  companyId: string;
}
