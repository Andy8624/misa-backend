import { Expose, Transform, Type } from 'class-transformer';
import { ResponseChartOfAccountDto } from 'src/entities/chart_of_account/dto/response-chart_of_account.dto';
import { ResponseGoodsAndServiceDto } from 'src/entities/goods_and_services/dto/response-goods_and_service.dto';
import { ResponseProvisionServiceVoucherDto } from 'src/entities/provision_service_voucher/dto/response-provision_service_voucher.dto';
import { ResponseUnitDto } from 'src/entities/unit/dto/response-unit.dto';
import { ResponseVatTaxDto } from 'src/entities/vat_tax/dto/response-vat_tax.dto';

export class ResponseProvisionServiceVoucherItemDto {
  @Expose()
  id: string;

  @Expose()
  provisionServiceVoucher: string;

  @Expose()
  item_id: string;

  @Expose()
  itemName: string;

  @Expose()
  unit: string;

  @Expose()
  quantity: number;

  @Expose()
  unitPrice: number;

  @Expose()
  vat: string;

  @Expose()
  discountRate: number;

  @Expose()
  creditAccountId: string;

  @Expose()
  debitAccountId: string;

  @Expose()
  discountAccountId: string;

  @Expose()
  vatAccountId: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  // Relations
  @Expose()
  @Type(() => ResponseProvisionServiceVoucherDto)
  ProvisionServiceVoucher?: ResponseProvisionServiceVoucherDto;

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
  @Type(() => ResponseChartOfAccountDto)
  creditAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  debitAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  discountAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  vatAccount?: ResponseChartOfAccountDto;
}
