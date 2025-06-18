import { Expose } from 'class-transformer';

export class ResponseGoodsAndServiceDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  vatDecrease: string;

  @Expose()
  minimumStockQuantity: number;

  @Expose()
  image: string;

  @Expose()
  source: string;

  @Expose()
  description: string;

  @Expose()
  purchaseDescription: string;

  @Expose()
  saleDescription: string;

  @Expose()
  latestPurchasePrice: number;

  @Expose()
  unitId: string | null;

  @Expose()
  warrantyPeriodId: string | null;

  @Expose()
  vatTaxId: string | null;

  @Expose()
  warehouseAccountId: string | null;

  @Expose()
  returnAccountId: string | null;

  @Expose()
  revenueAccountId: string | null;

  @Expose()
  expenseAccountId: string | null;

  @Expose()
  salesAllowanceAccountId: string | null;

  @Expose()
  discountAccountId: string | null;

  @Expose()
  customerId: string;

  @Expose()
  createdAt: string;
}
