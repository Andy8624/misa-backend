import { Expose, Transform, Type } from 'class-transformer';
import { ResponseBankDto } from 'src/entities/bank/dto/response-bank.dto';
import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';
import { ResponseFileDto } from 'src/entities/file/dto/response-file.dto';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';
import { ResponsePaymentTermDto } from 'src/entities/payment_term/dto/response-payment_term.dto';

export class ResponseProvisionServiceVoucherDto {
  @Expose()
  id: string;

  @Expose()
  voucherNumber: string;

  @Expose()
  paymentStatus: string;

  @Expose()
  paymentMethod: string;

  @Expose()
  withInvoice: string;

  @Expose()
  isSubstituteInvoice: string;

  @Expose()
  other_t_and_c: string;

  @Expose()
  e_invoice_search_id: string;

  @Expose()
  e_invoice_search_url: string;

  @Expose()
  attached: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  postDate: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  voucherDate: Date;

  @Expose()
  paymentTAndC: string;

  @Expose()
  payWithinDay: number;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  dueDate: Date;

  @Expose()
  cash_receipt_customer_id: string;

  @Expose()
  cash_receipt_customer_name: string;

  @Expose()
  cash_receipt_address: string;

  @Expose()
  cash_receipt_back_account: string;

  @Expose()
  cash_receipt_back_name: string;

  @Expose()
  cashReceiptStoreperson: string;

  @Expose()
  cash_receipt_particular: string;

  @Expose()
  debtVoucherCustomer: string;

  @Expose()
  debt_voucher_customer_name: string;

  @Expose()
  debt_voucher_contact: string;

  @Expose()
  debt_voucher_tax_code: string;

  @Expose()
  debt_voucher_address: string;

  @Expose()
  debtVoucherStoreperson: string;

  @Expose()
  debt_voucher_description: string;

  @Expose()
  invoiceCustomer: string;

  @Expose()
  invoice_customer_name: string;

  @Expose()
  invoice_tax_code: string;

  @Expose()
  invoice_purchaser: string;

  @Expose()
  invoice_payment_method: string;

  @Expose()
  invoice_bank_account: string;

  @Expose()
  invoice_address: string;

  @Expose()
  invoice_sign: string;

  @Expose()
  invoice_form: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  invoice_date: Date;

  @Expose()
  invoice_number: string;

  @Expose()
  cash_receipt_voucher_customer_id: string;

  @Expose()
  cash_receipt_voucher_customer_name: string;

  @Expose()
  cash_receipt_voucher_address: string;

  @Expose()
  cash_receipt_voucher_payer: string;

  @Expose()
  cash_receipt_voucher_storeperson: string;

  @Expose()
  cash_receipt_voucher_particular: string;

  @Expose()
  cash_receipt_voucher_with_original_voucher: number;

  @Expose()
  percent_discount_invoice_value: number;

  @Expose()
  discount_type: string;

  @Expose()
  customer: string;

  @Expose()
  customer_name: string;

  @Expose()
  customer_tax_code: string;

  @Expose()
  customer_address: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  // Relations
  @Expose()
  @Type(() => ResponseFileDto)
  Attached?: ResponseFileDto;

  @Expose()
  @Type(() => ResponsePaymentTermDto)
  PaymentTAndC?: ResponsePaymentTermDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  CashReceiptCustomer?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponseBankDto)
  CashReceiptBankAccount?: ResponseBankDto;

  @Expose()
  @Type(() => ResponseEmployeeDto)
  CashReceiptStoreperson?: ResponseEmployeeDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  DebtVoucherCustomer?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponseEmployeeDto)
  DebtVoucherStoreperson?: ResponseEmployeeDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  InvoiceCustomer?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  CashReceiptVoucherCustomer?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponseEmployeeDto)
  CashReceiptVoucherStoreperson?: ResponseEmployeeDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  Customer?: ResponsePartnerDto;
}
