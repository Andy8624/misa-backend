import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSalesReturnDto {
  @Expose()
  @IsOptional()
  voucherGroup?: string;

  @Expose()
  @IsOptional()
  voucherTypeHigh?: string;

  @Expose()
  @IsOptional()
  voucherTypeMedium?: string;

  @Expose()
  @IsOptional()
  isAlsoInventoryReceipt?: boolean;

  @Expose()
  @IsOptional()
  invoiceLookupCode?: string;

  @Expose()
  @IsOptional()
  invoiceLookupPath?: string;

  @Expose()
  @IsOptional()
  description?: string;

  @Expose()
  @IsOptional()
  customerId?: string;

  @Expose()
  @IsOptional()
  employeeId?: string;

  @Expose()
  @IsOptional()
  departmentId?: string;

  @Expose()
  @IsOptional()
  withOriginalVoucher?: string;

  @Expose()
  @IsOptional()
  deliveryName?: string;

  @Expose()
  @IsOptional()
  recieptName?: string;

  @Expose()
  @IsOptional()
  invoiceNo?: string;

  @Expose()
  @IsOptional()
  invoiceSymbol?: string;

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
