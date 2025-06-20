import { Expose, Transform, Type } from 'class-transformer';
import { ResponseChartOfAccountDto } from 'src/entities/chart_of_account/dto/response-chart_of_account.dto';
import { ResponseGoodsAndServiceDto } from 'src/entities/goods_and_services/dto/response-goods_and_service.dto';
import { ResponseSaleVoucherDto } from 'src/entities/sale_voucher/dto/response-sale_voucher.dto';
import { ResponseUnitDto } from 'src/entities/unit/dto/response-unit.dto';
import { ResponseVatTaxDto } from 'src/entities/vat_tax/dto/response-vat_tax.dto';
import { ResponseWarehouseDto } from 'src/entities/warehouse/dto/response-warehouse.dto';

export class ResponseSaleVoucherItemDto {
  @Expose()
  id: string;

  @Expose()
  sales_voucher: string;

  @Expose()
  item_id: string;

  @Expose()
  item_name: string;

  @Expose()
  unit: string;

  @Expose()
  quantity: number;

  @Expose()
  unit_price: number;

  @Expose()
  unit_cost_of_sales: number;

  @Expose()
  cost_of_goods_sold: number;

  @Expose()
  vat: string;

  @Expose()
  export_taxed_value: number;

  @Expose()
  percent_export_tax: number;

  @Expose()
  discount_rate: number;

  @Expose()
  warehouse: string;

  @Expose()
  expense_account: string;

  @Expose()
  inventory_account: string;

  @Expose()
  creditAccountId: string;

  @Expose()
  debitAccountId: string;

  @Expose()
  cashAccountId: string;

  @Expose()
  liabilityAccountId: string;

  @Expose()
  liability_account_or_expense_account_id: string;

  @Expose()
  sales_account_id: string;

  @Expose()
  export_tax_account_id: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  // Relations
  @Expose()
  @Type(() => ResponseSaleVoucherDto)
  SaleVoucher?: ResponseSaleVoucherDto;

  @Expose()
  @Type(() => ResponseGoodsAndServiceDto)
  Item?: ResponseGoodsAndServiceDto;

  @Expose()
  @Type(() => ResponseUnitDto)
  Unit?: ResponseUnitDto;

  @Expose()
  @Type(() => ResponseVatTaxDto)
  Vat?: ResponseVatTaxDto;

  @Expose()
  @Type(() => ResponseWarehouseDto)
  Warehouse?: ResponseWarehouseDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  ExpenseAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  InventoryAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  creditAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  debitAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  cashAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  liabilityAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  liabilityAccountOrExpenseAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  SaleAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  ExportTaxAccount?: ResponseChartOfAccountDto;
}
