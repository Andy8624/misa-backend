import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateInventoryOutDto {
  @Expose()
  @IsOptional()
  inventoryOutVoucherType?: string;

  @Expose()
  @IsOptional()
  address?: string;

  @Expose()
  @IsOptional()
  receipient?: string;

  @Expose()
  @IsOptional()
  particular?: string;

  @Expose()
  @IsOptional()
  withOriginalVoucher?: string;

  @Expose()
  @IsOptional()
  component?: string;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => value.toISOString())
  postedDate?: Date;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => value.toISOString())
  voucherDate?: Date;

  @Expose()
  @IsOptional()
  voucherNumber?: string;

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
