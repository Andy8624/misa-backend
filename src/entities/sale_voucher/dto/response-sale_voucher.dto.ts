import { Expose, Transform, Type } from 'class-transformer';
import { ResponseBankAccountDto } from 'src/entities/bank_account/dto/response-bank_account.dto';
import { ResponseBankDto } from 'src/entities/bank/dto/response-bank.dto';
import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';
import { ResponsePaymentTermDto } from 'src/entities/payment_term/dto/response-payment_term.dto';
import { ResponseSaleVoucherItemDto } from 'src/entities/sale_voucher_item/dto/response-sale_voucher_item.dto';
import { ResponseVoucherDto } from 'src/entities/voucher/dto/response-voucher.dto';

export class ResponseSaleVoucherDto {
  @Expose()
  id: string;

  @Expose()
  payment_status: string;

  @Expose()
  payment_method: string;

  @Expose()
  inventory_out_voucher_included: string;

  @Expose()
  with_invoice: string;

  @Expose()
  is_substitute_invoice: string;

  @Expose()
  pick_up_location: string;

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
  contract_number: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  contract_date: Date;

  @Expose()
  b_l_no: string;

  @Expose()
  container_no: string;

  @Expose()
  export_pick_up_location: string;

  @Expose()
  shipping_provider: string;

  @Expose()
  discount_type: string;

  @Expose()
  percent_discount_invoice_value: string;

  @Expose()
  invoice_customer_id: string;

  @Expose()
  invoice_customer_name: string;

  @Expose()
  invoice_tax_code: string;

  @Expose()
  invoice_address: string;

  @Expose()
  invoice_purchaser: string;

  @Expose()
  invoice_payment_method: string;

  @Expose()
  invoice_bank_account: string;

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
  inventory_out_voucher_customer_id: string;

  @Expose()
  inventory_out_voucher_customer_name: string;

  @Expose()
  inventory_out_voucher_receipient: string;

  @Expose()
  inventory_out_voucher_address: string;

  @Expose()
  inventory_out_voucher_storeperson: string;

  @Expose()
  inventory_out_voucher_particular: string;

  @Expose()
  inventory_out_voucher_with_original_voucher: string;

  @Expose()
  debt_voucher_customer_id: string;

  @Expose()
  debt_voucher_customer_name: string;

  @Expose()
  debt_voucher_tax_code: string;

  @Expose()
  debt_voucher_address: string;

  @Expose()
  debt_voucher_contact: string;

  @Expose()
  debt_voucher_storeperson: string;

  @Expose()
  debt_voucher_description: string;

  @Expose()
  debt_voucher_principal: string;

  @Expose()
  debt_voucher_trustor: string;

  @Expose()
  cash_receipt_customer_id: string;

  @Expose()
  cash_receipt_customer_name: string;

  @Expose()
  cash_receipt_customer_address: string;

  @Expose()
  cash_receipt_cash_in_bank_receipt: string;

  @Expose()
  cash_receipt_bank_name: string;

  @Expose()
  cash_receipt_storeperson: string;

  @Expose()
  cash_receipt_particular: string;

  @Expose()
  cash_receipt_principal: string;

  @Expose()
  cash_receipt_voucher_customer_id: string;

  @Expose()
  cash_receipt_voucher_customer_name: string;

  @Expose()
  cash_receipt_voucher_payer: string;

  @Expose()
  cash_receipt_voucher_storeperson: string;

  @Expose()
  cash_receipt_voucher_address: string;

  @Expose()
  cash_receipt_voucher_with_original_voucher: string;

  @Expose()
  cash_receipt_voucher_particular: string;

  @Expose()
  cash_receipt_voucher_principal: string;

  @Expose()
  customer: string;

  @Expose()
  customer_name: string;

  @Expose()
  sales_voucher: string;

  @Expose()
  customer_tax_code: string;

  @Expose()
  customer_address: string;

  @Expose()
  voucher_number: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  // Relations
  // @Expose()
  // @Type(() => ResponseFileDto)
  // Attached?: ResponseFileDto;

  @Expose()
  @Type(() => ResponsePaymentTermDto)
  PaymentTAndC?: ResponsePaymentTermDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  InvoiceCustomer?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponseBankAccountDto)
  InvoiceBankAccount?: ResponseBankAccountDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  InventoryOutVoucherCustomer?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponseEmployeeDto)
  InventoryOutVoucherStorePerson?: ResponseEmployeeDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  DebtVoucherCustomer?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponseEmployeeDto)
  DebtVoucherStoreperson?: ResponseEmployeeDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  DebtVoucherPrincipal?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  DebtVoucherTrustor?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  CashReceiptCustomer?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponseBankDto)
  CashReceiptCashInBankReceipt?: ResponseBankDto;

  @Expose()
  @Type(() => ResponseEmployeeDto)
  CashReceiptStoreperson?: ResponseEmployeeDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  CashReceiptPrincipal?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  CashReceiptVoucherCustomer?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponseEmployeeDto)
  CashReceiptVoucherStoreperson?: ResponseEmployeeDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  CashReceiptVoucherPrincipal?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  Customer?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponseSaleVoucherItemDto)
  SaleVoucherItem_SaleVoucher?: ResponseSaleVoucherItemDto[];

  @Expose()
  @Type(() => ResponseVoucherDto)
  voucher?: ResponseVoucherDto;
}
