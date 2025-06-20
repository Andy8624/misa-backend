import { Expose, Transform, Type } from 'class-transformer';
import { ResponseBankAccountDto } from 'src/entities/bank_account/dto/response-bank_account.dto';
import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';
import { ResponseFileDto } from 'src/entities/file/dto/response-file.dto';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';
import { ResponsePaymentTermDto } from 'src/entities/payment_term/dto/response-payment_term.dto';
import { ResponsePurchaseVoucherItemDto } from 'src/entities/purchase_voucher_item/dto/response-purchase_voucher_item.dto';

export class ResponsePurchaseVoucherDto {
  @Expose()
  id: string;

  @Expose()
  purchase_type: string;

  @Expose()
  voucher_number: string;

  @Expose()
  payment_status: string;

  @Expose()
  payment_method: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  posted_date: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  voucher_date: Date;

  @Expose()
  payment_t_and_c: string;

  @Expose()
  pay_within_days: number;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  due_date: Date;

  @Expose()
  supplier: string;

  @Expose()
  supplier_name: string;

  @Expose()
  supplier_address: string;

  @Expose()
  supplier_tax_code: string;

  @Expose()
  courier: string;

  @Expose()
  purchasing_staff: string;

  @Expose()
  receipient: string;

  @Expose()
  quantity_original_number: string;

  @Expose()
  inventory_in_voucher_no: string;

  @Expose()
  recipient_account: string;

  @Expose()
  recipient_account_bank_name: string;

  @Expose()
  description: string;

  @Expose()
  payment_account: string;

  @Expose()
  payment_account_bank_name: string;

  @Expose()
  e_invoice_search_id: string;

  @Expose()
  e_invoice_search_url: string;

  @Expose()
  attached: string;

  @Expose()
  inventory_in_voucher_particular: string;

  @Expose()
  cash_payment_voucher_particular: string;

  @Expose()
  debt_voucher_particular: string;

  @Expose()
  invoice_form: string;

  @Expose()
  invoice_sign: string;

  @Expose()
  invoice_number: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  invoice_date: Date;

  @Expose()
  discount: string;

  @Expose()
  discount_rate: string;

  @Expose()
  personal_id_number: string;

  @Expose()
  issued_date: string;

  @Expose()
  issued_by: string;

  @Expose()
  invoice_inclusion: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  // Relations
  @Expose()
  @Type(() => ResponsePaymentTermDto)
  PaymentTAndC?: ResponsePaymentTermDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  Supplier?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponseEmployeeDto)
  PurchasingStaff?: ResponseEmployeeDto;

  @Expose()
  @Type(() => ResponseBankAccountDto)
  RecipientAccount?: ResponseBankAccountDto;

  @Expose()
  @Type(() => ResponseBankAccountDto)
  PaymentAccount?: ResponseBankAccountDto;

  @Expose()
  @Type(() => ResponseFileDto)
  Attached?: ResponseFileDto;

  @Expose()
  @Type(() => ResponsePurchaseVoucherItemDto)
  PurchaseVoucherItem_PurchaseVoucher?: ResponsePurchaseVoucherItemDto[];
}
