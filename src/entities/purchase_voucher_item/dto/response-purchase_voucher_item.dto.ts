import { Expose, Transform, Type } from 'class-transformer';
import { ResponseChartOfAccountDto } from 'src/entities/chart_of_account/dto/response-chart_of_account.dto';
import { ResponseGoodsAndServiceDto } from 'src/entities/goods_and_services/dto/response-goods_and_service.dto';
import { ResponseGroupOfPurchaseGoodDto } from 'src/entities/group_of_purchase_good/dto/response-group_of_purchase_good.dto';
import { ResponsePurchaseVoucherDto } from 'src/entities/purchase_voucher/dto/response-purchase_voucher.dto';
import { ResponseUnitDto } from 'src/entities/unit/dto/response-unit.dto';
import { ResponseVatTaxDto } from 'src/entities/vat_tax/dto/response-vat_tax.dto';
import { ResponseWarehouseDto } from 'src/entities/warehouse/dto/response-warehouse.dto';

export class ResponsePurchaseVoucherItemDto {
  @Expose()
  id: string;

  @Expose()
  purchase_voucher: string;

  @Expose()
  item_id: string;

  @Expose()
  item_name: string;

  @Expose()
  cost_account: string;

  @Expose()
  account_payable: string;

  @Expose()
  cash_account: string;

  @Expose()
  inventory_account: string;

  @Expose()
  unit: string;

  @Expose()
  quantity: number;

  @Expose()
  unit_price: number;

  @Expose()
  vat: string;

  @Expose()
  vat_account: string;

  @Expose()
  purchase_cost: number;

  @Expose()
  pre_custom_cost: number;

  @Expose()
  group_of_purchased_goods: string;

  @Expose()
  discount_rate: string;

  @Expose()
  warehouse: string;

  @Expose()
  automatically_calculate: string;

  @Expose()
  pre_customs_cost_in_accounting_currency: string;

  @Expose()
  pre_customs_cost_in_foreign_currency: string;

  @Expose()
  custom_exchange_rate: string;

  @Expose()
  import_tax_rate: string;

  @Expose()
  import_tax_account: string;

  @Expose()
  special_consumption_tax_rate: string;

  @Expose()
  special_consumption_tax_account: string;

  @Expose()
  vat_description: string;

  @Expose()
  vat_corresponding_account: string;

  @Expose()
  fob: number;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  // Relations
  @Expose()
  @Type(() => ResponsePurchaseVoucherDto)
  PurchaseVoucher?: ResponsePurchaseVoucherDto;

  @Expose()
  @Type(() => ResponseGoodsAndServiceDto)
  Item?: ResponseGoodsAndServiceDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  CostAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  AccountPayable?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  CashAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  InventoryAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseUnitDto)
  Unit?: ResponseUnitDto;

  @Expose()
  @Type(() => ResponseVatTaxDto)
  Vat?: ResponseVatTaxDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  VatAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseGroupOfPurchaseGoodDto)
  GroupOfPurchaseGood?: ResponseGroupOfPurchaseGoodDto;

  @Expose()
  @Type(() => ResponseWarehouseDto)
  Warehouse?: ResponseWarehouseDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  ImportTaxAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  SpecialConsumptionTaxAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  VatCorrespondingAccount?: ResponseChartOfAccountDto;
}
