import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSalesContractDto {
  @Expose()
  @IsOptional()
  projectId?: string;

  @Expose()
  @IsOptional()
  contractValue?: number;

  @Expose()
  @IsOptional()
  contractStatus?: string;

  @Expose()
  @IsOptional()
  shipStatus?: string;

  @Expose()
  @IsOptional()
  customerId?: string;

  @Expose()
  @IsOptional()
  contactEmployeeId?: string;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => value.toISOString())
  deliveryDueDate?: Date;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => value.toISOString())
  paymentDueDate?: Date;

  @Expose()
  @IsOptional()
  liquidationValue?: number;

  @Expose()
  @IsOptional()
  otherTerms?: string;

  @Expose()
  @IsOptional()
  deliveryAdress?: string;

  @Expose()
  @IsOptional()
  isCosting?: boolean;

  @Expose()
  @IsOptional()
  isInvoiced?: boolean;

  @Expose()
  @IsOptional()
  isPreSystemData?: boolean;

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
