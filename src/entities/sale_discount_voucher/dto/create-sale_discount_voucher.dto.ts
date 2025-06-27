import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSaleDiscountVoucherDto {
  @Expose()
  @IsOptional()
  voucherType?: string;

  @Expose()
  @IsOptional()
  typeInside?: string;

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
  description?: string;

  @Expose()
  @IsOptional()
  invoiceLookupCode?: string;

  @Expose()
  @IsOptional()
  invoiceLookupPath?: string;

  @Expose()
  @IsOptional()
  invoiceNo?: string;

  @Expose()
  @IsOptional()
  invoiceSymbol?: string;

  @Expose()
  @IsOptional()
  taxCode?: string;

  @Expose()
  @IsOptional()
  paymentType?: string;

  @Expose()
  @IsOptional()
  bankAccountId?: string;

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
