import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateQuotationDto {
  @Expose()
  @IsOptional()
  customerId?: string;

  @Expose()
  @IsOptional()
  employeeId?: string;

  @Expose()
  @IsOptional()
  contactEmployeeId?: string;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => value.toISOString())
  expiredAt?: Date;

  @Expose()
  @IsOptional()
  taxCode?: string;

  @Expose()
  @IsOptional()
  description?: string;

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
