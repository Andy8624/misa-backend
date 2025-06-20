import { Expose, Transform, Type } from 'class-transformer';
import { ResponseChartOfAccountDto } from 'src/entities/chart_of_account/dto/response-chart_of_account.dto';
import { ResponseGoodsAndServiceDto } from 'src/entities/goods_and_services/dto/response-goods_and_service.dto';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';
import { ResponseUnitDto } from 'src/entities/unit/dto/response-unit.dto';

export class ResponseVoucherAccountEntryDto {
  @Expose()
  id: string;

  @Expose()
  serviceVoucher: string;

  @Expose()
  type: string;

  @Expose()
  itemName: string;

  @Expose()
  itemId: string;

  @Expose()
  customerName: string;

  @Expose()
  unitPrice: number;

  @Expose()
  quantity: number;

  @Expose()
  creditAccountId: string;

  @Expose()
  debitAccountId: string;

  @Expose()
  subject: string;

  @Expose()
  unitId: string;

  @Expose()
  supplierName: string;

  @Expose()
  supplierAddress: string;

  @Expose()
  supplierTaxCode: string;

  @Expose()
  groupOfPurchasedGood: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  invoiceDate: Date;

  @Expose()
  invoiceNumber: string;

  @Expose()
  vatDescription: string;

  @Expose()
  vatAccount: string;

  @Expose()
  supplier: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  // Relations
  @Expose()
  @Type(() => ResponseGoodsAndServiceDto)
  ItemId?: ResponseGoodsAndServiceDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  creditAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  debitAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  Subject?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponseUnitDto)
  Unit?: ResponseUnitDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  VatAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  Supplier?: ResponsePartnerDto;
}
