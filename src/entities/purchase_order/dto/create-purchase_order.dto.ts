import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePurchaseOrderDto {
  @Expose()
  @IsOptional()
  customerId?: string;

  @Expose()
  @IsOptional()
  employeeId?: string;

  @Expose()
  @IsOptional()
  taxCode?: string;

  @Expose()
  @IsOptional()
  recipientName?: string;

  @Expose()
  @IsOptional()
  description?: string;

  @Expose()
  @IsOptional()
  paymentTermId?: string;

  @Expose()
  @IsOptional()
  creditDays?: number;

  @Expose()
  @IsOptional()
  isCosting?: boolean;

  @Expose()
  @IsOptional()
  orderStatus?: string;

  @Expose()
  @IsOptional()
  deliveryStatus?: string;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => value.toISOString())
  deliveryDate?: Date;

  @Expose()
  @IsOptional()
  deliveryAddress?: string;

  @Expose()
  @IsNotEmpty({ message: 'Company ID cannot be empty' })
  companyId: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  postedDate?: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  @IsOptional()
  voucherDate?: Date;

  @Expose()
  @IsOptional()
  voucherNumber?: string;

  @Expose()
  @IsOptional()
  circularId?: string;
}
