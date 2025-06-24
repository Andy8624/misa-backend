import { Expose, Transform, Type } from 'class-transformer';
import { ResponseBankDto } from 'src/entities/bank/dto/response-bank.dto';
import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';
import { ResponsePaymentTermDto } from 'src/entities/payment_term/dto/response-payment_term.dto';
import { ResponseVoucherDto } from 'src/entities/voucher/dto/response-voucher.dto';

export class ResponseServicePurchaseVoucherDto {
  @Expose()
  id: string;

  @Expose()
  idCardNo: string;

  @Expose()
  paymentMethod: string;

  @Expose()
  paymentStatus: string;

  @Expose()
  paymentAccountBankName: string;

  @Expose()
  paymentDetail: string;

  @Expose()
  invoiceInclusion: string;

  @Expose()
  description: string;

  @Expose()
  receipient: string;

  @Expose()
  particular: string;

  @Expose()
  quantityOriginalVoucher: string;

  @Expose()
  recipient: string;

  @Expose()
  recipientAccountName: string;

  @Expose()
  supplierName: string;

  @Expose()
  supplierAddress: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  issuedDate: Date;

  @Expose()
  issuedBy: string;

  @Expose()
  payWithInDays: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  dueDate: Date;

  @Expose()
  cashPaymentVoucherNo: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  cashPaymentVoucherDate: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  postedDate: Date;

  @Expose()
  voucherNumber: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  voucherDate: Date;

  @Expose()
  purchase_without_invoiceInfo_supplier_name: string;

  @Expose()
  purchase_without_invoiceInfo_id_card_no: string;

  @Expose()
  purchase_without_invoiceInfo_address: string;

  @Expose()
  recipientAccount: string;

  @Expose()
  supplier: string;

  @Expose()
  purchasingStaff: string;

  @Expose()
  paymentAccount: string;

  @Expose()
  paymentTerm: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  // Relations
  @Expose()
  @Type(() => ResponseBankDto)
  RecipientAccount?: ResponseBankDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  Supplier?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponseEmployeeDto)
  PurchasingStaff?: ResponseEmployeeDto;

  @Expose()
  @Type(() => ResponseBankDto)
  PaymentAccount?: ResponseBankDto;

  @Expose()
  @Type(() => ResponsePaymentTermDto)
  PaymentTerm?: ResponsePaymentTermDto;

  @Expose()
  @Type(() => ResponseVoucherDto)
  voucher?: ResponseVoucherDto;
}
