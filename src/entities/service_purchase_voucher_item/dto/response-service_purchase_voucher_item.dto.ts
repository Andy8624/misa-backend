import { Expose, Transform, Type } from 'class-transformer';
import { ResponseChartOfAccountDto } from 'src/entities/chart_of_account/dto/response-chart_of_account.dto';
import { ResponseGoodsAndServiceDto } from 'src/entities/goods_and_services/dto/response-goods_and_service.dto';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';
import { ResponseServicePurchaseVoucherDto } from 'src/entities/service_purchase_voucher/dto/response-service_purchase_voucher.dto';
import { ResponseUnitDto } from 'src/entities/unit/dto/response-unit.dto';
import { ResponseVatTaxDto } from 'src/entities/vat_tax/dto/response-vat_tax.dto';

export class ResponseServicePurchaseVoucherItemDto {
  @Expose()
  id: string;

  @Expose()
  itemName: string;

  @Expose()
  subjectName: string;

  @Expose()
  quantity: number;

  @Expose()
  unitPrice: number;

  @Expose()
  invoiceNumber: string;

  @Expose()
  invoiceDate: string;

  @Expose()
  vatDescription: string;

  @Expose()
  groupOfPurchasedGood: string;

  @Expose()
  supplierTaxCode: string;

  @Expose()
  supplierName: string;

  @Expose()
  supplierAddress: string;

  @Expose()
  vat: string;

  @Expose()
  subject: string;

  @Expose()
  vatAccount: string;

  @Expose()
  supplier: string;

  @Expose()
  creditAccountId: string;

  @Expose()
  debitAccountId: string;

  @Expose()
  itemId: string;

  @Expose()
  servicePurchaseVoucher: string;

  @Expose()
  unitId: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  // Relations
  @Expose()
  @Type(() => ResponseVatTaxDto)
  Vat?: ResponseVatTaxDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  Subject?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  VatAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  Supplier?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  creditAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  debitAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseGoodsAndServiceDto)
  ItemId?: ResponseGoodsAndServiceDto;

  @Expose()
  @Type(() => ResponseServicePurchaseVoucherDto)
  ServicePurchaseVoucher?: ResponseServicePurchaseVoucherDto;

  @Expose()
  @Type(() => ResponseUnitDto)
  Unit?: ResponseUnitDto;
}
