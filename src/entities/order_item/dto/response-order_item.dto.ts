import { Expose, Transform, Type } from 'class-transformer';
import { ResponseQuotationDto } from 'src/entities/quotation/dto/response-quotation.dto'; // Giả sử có DTO cho Quotation
import { ResponseChartOfAccountDto } from 'src/entities/chart_of_account/dto/response-chart_of_account.dto';
import { ResponseSalesReturnDto } from 'src/entities/sales_return/dto/response-sales_return.dto';
import { ResponseSaleDiscountVoucherDto } from 'src/entities/sale_discount_voucher/dto/response-sale_discount_voucher.dto';
import { ResponsePurchaseOrderDto } from 'src/entities/purchase_order/dto/response-purchase_order.dto';
import { ResponseGoodsAndServiceDto } from 'src/entities/goods_and_services/dto/response-goods_and_service.dto';

export class ResponseOrderItemDto {
  @Expose()
  id: string;

  @Expose()
  @Type(() => ResponseGoodsAndServiceDto)
  Goods?: ResponseGoodsAndServiceDto;

  @Expose()
  goodId?: string;

  @Expose()
  quantity?: number;

  @Expose()
  deliveredQuantity?: number;

  @Expose()
  unitPrice?: number;

  @Expose()
  discount?: string;

  @Expose()
  discountRate?: number;

  @Expose()
  vatRate?: number;

  @Expose()
  salesVoucherNumber?: number;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  DiscountAccount?: ResponseChartOfAccountDto;

  @Expose()
  discountAccountId?: string;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  ReceivableAccount?: ResponseChartOfAccountDto;

  @Expose()
  receivableAccountId?: string;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  VatAccount?: ResponseChartOfAccountDto;

  @Expose()
  vatAccountId?: string;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  CreditAccount?: ResponseChartOfAccountDto;

  @Expose()
  creditAccountId?: string;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  DebitAccount?: ResponseChartOfAccountDto;

  @Expose()
  debitAccountId?: string;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  ReturnAccount?: ResponseChartOfAccountDto;

  @Expose()
  returnAccountId?: string;

  @Expose()
  @Type(() => ResponseQuotationDto)
  Quote?: ResponseQuotationDto;

  @Expose()
  quoteId?: string;

  @Expose()
  @Type(() => ResponsePurchaseOrderDto)
  PurchaseOrder?: ResponsePurchaseOrderDto;

  @Expose()
  purchaseOrderId?: string;

  @Expose()
  @Type(() => ResponseSaleDiscountVoucherDto)
  SaleDiscountVoucher?: ResponseSaleDiscountVoucherDto;

  @Expose()
  saleDiscountVoucherId?: string;

  @Expose()
  @Type(() => ResponseSalesReturnDto)
  SalesReturn?: ResponseSalesReturnDto;

  @Expose()
  salesReturnId?: string;

  @Expose()
  companyId: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  updatedAt?: Date;
}
