import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGoodsAndServiceDto {
  @Expose()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @Expose()
  @IsNotEmpty({ message: 'Code cannot be empty' })
  code: string;

  @Expose()
  @IsNotEmpty({ message: 'VAT decrease cannot be empty' })
  vatDecrease: string;

  @Expose()
  @IsNotEmpty({ message: 'Minimum stock quantity cannot be empty' })
  minimumStockQuantity: number;

  @Expose()
  @IsOptional()
  image?: string;

  @Expose()
  @IsOptional()
  source?: string;

  @Expose()
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @Expose()
  @IsNotEmpty({ message: 'Purchase description cannot be empty' })
  purchaseDescription: string;

  @Expose()
  @IsNotEmpty({ message: 'Sale description cannot be empty' })
  saleDescription: string;

  @Expose()
  @IsNotEmpty({ message: 'Latest purchase price cannot be empty' })
  latestPurchasePrice: number;

  @Expose()
  @IsOptional()
  unitId?: string;

  @Expose()
  @IsOptional()
  warrantyPeriodId?: string;

  @Expose()
  @IsOptional()
  vatTaxId?: string;

  @Expose()
  @IsOptional()
  warehouseAccountId?: string;

  @Expose()
  @IsOptional()
  returnAccountId?: string;

  @Expose()
  @IsOptional()
  revenueAccountId?: string;

  @Expose()
  @IsOptional()
  expenseAccountId?: string;

  @Expose()
  @IsOptional()
  salesAllowanceAccountId?: string;

  @Expose()
  @IsOptional()
  discountAccountId?: string;

  @Expose()
  @IsNotEmpty({ message: 'Customer cannot be empty' })
  customerId: string;
}
