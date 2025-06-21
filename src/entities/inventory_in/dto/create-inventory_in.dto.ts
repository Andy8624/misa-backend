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
  courier?: string; // Shipper

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
  @IsNotEmpty({ message: 'Voucher number cannot be empty' })
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
  @IsNotEmpty({ message: 'Company ID cannot be empty' })
  companyId: string;
}
