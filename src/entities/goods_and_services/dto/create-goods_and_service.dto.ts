import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGoodsAndServiceDto {
  @Expose()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;

  @Expose()
  @IsNotEmpty({ message: 'Mã không được để trống' })
  code: string;

  @Expose()
  @IsNotEmpty({ message: 'Giảm VAT không được để trống' })
  vatDecrease: string;

  @Expose()
  @IsNotEmpty({ message: 'Tồn kho tối thiểu không được để trống' })
  minimumStockQuantity: number;

  @Expose()
  @IsOptional()
  image?: string;

  @Expose()
  @IsOptional()
  source?: string;

  @Expose()
  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  description: string;

  @Expose()
  @IsNotEmpty({ message: 'Mô tả mua hàng không được để trống' })
  purchaseDescription: string;

  @Expose()
  @IsNotEmpty({ message: 'Mô tả bán hàng không được để trống' })
  saleDescription: string;

  @Expose()
  @IsNotEmpty({ message: 'Giá mua gần nhất không được để trống' })
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
  @IsNotEmpty({ message: 'Khách hàng không được để trống' })
  customerId: string;
}
