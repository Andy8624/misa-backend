import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderItemDto {
  @Expose()
  @IsOptional()
  goodId?: string;

  @Expose()
  @IsOptional()
  quantity?: number;

  @Expose()
  @IsOptional()
  deliveredQuantity?: number;

  @Expose()
  @IsOptional()
  unitPrice?: number;

  @Expose()
  @IsOptional()
  discount?: string;

  @Expose()
  @IsOptional()
  discountRate?: number;

  @Expose()
  @IsOptional()
  vatRate?: number;

  @Expose()
  @IsOptional()
  salesVoucherNumber?: number;

  @Expose()
  @IsOptional()
  discountAccountId?: string;

  @Expose()
  @IsOptional()
  receivableAccountId?: string;

  @Expose()
  @IsOptional()
  vatAccountId?: string;

  @Expose()
  @IsOptional()
  creditAccountId?: string;

  @Expose()
  @IsOptional()
  debitAccountId?: string;

  @Expose()
  @IsOptional()
  returnAccountId?: string;

  @Expose()
  @IsOptional()
  quoteId?: string;

  @Expose()
  @IsOptional()
  purchaseOrderId?: string;

  @Expose()
  @IsOptional()
  saleDiscountVoucherId?: string;

  @Expose()
  @IsOptional()
  salesReturnId?: string;

  @Expose()
  @IsNotEmpty({ message: 'Company ID cannot be empty' })
  companyId: string;
}
