import { Expose, Type } from 'class-transformer';
import { ResponseChartOfAccountDto } from 'src/entities/chart_of_account/dto/response-chart_of_account.dto';
import { ResponseGoodsAndServicesMappingDto } from 'src/entities/goods_and_services_mapping/dto/response-goods_and_services_mapping.dto';
import { ResponseUnitDto } from 'src/entities/unit/dto/response-unit.dto';
import { ResponseVatTaxDto } from 'src/entities/vat_tax/dto/response-vat_tax.dto';
import { ResponseWarrantyPeriodDto } from 'src/entities/warranty_period/dto/response--warranty_period.dto';

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

  // ✅ Relations - cần import các DTO tương ứng
  @Expose()
  @Type(() => ResponseGoodsAndServicesMappingDto)
  GoodsAndServicesGroupMapping?: ResponseGoodsAndServicesMappingDto[];

  @Expose()
  Unit?: ResponseUnitDto[];

  @Expose()
  WarrantyPeriod?: ResponseWarrantyPeriodDto[];

  @Expose()
  VatTax?: ResponseVatTaxDto[];

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  WarehouseAccount?: ResponseChartOfAccountDto[];

  @Expose()
  ReturnAccount?: ResponseChartOfAccountDto[];

  @Expose()
  RevenueAccount?: ResponseChartOfAccountDto[];

  @Expose()
  ExpenseAccount?: ResponseChartOfAccountDto[];

  @Expose()
  SalesAllowanceAccount?: ResponseChartOfAccountDto[];

  @Expose()
  DiscountAccount?: ResponseChartOfAccountDto[];
}
