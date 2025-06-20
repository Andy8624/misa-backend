import { Expose, Type } from 'class-transformer';
import { ResponseBankDto } from 'src/entities/bank/dto/response-bank.dto';
import { ResponseCashPaymentDto } from 'src/entities/cash-payment/dto/response-cash-payment.dto';
import { ResponseChartOfAccountDto } from 'src/entities/chart_of_account/dto/response-chart_of_account.dto';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';

export class ResponseCashPaymentVoucherItemDto {
  @Expose()
  id: string;

  @Expose()
  amount: number;

  @Expose()
  description: string;

  @Expose()
  cashPayment: string;

  @Expose()
  subject: string;

  @Expose()
  debitAccount: string;

  @Expose()
  creditAccount: string;

  @Expose()
  bank: string;

  // Relations
  @Expose()
  @Type(() => ResponseCashPaymentDto)
  CashPayment?: ResponseCashPaymentDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  Subject?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  DebitAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  CreditAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseBankDto)
  Bank?: ResponseBankDto;
}
