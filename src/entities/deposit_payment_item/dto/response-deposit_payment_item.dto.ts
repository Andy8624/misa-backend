import { Expose, Transform, Type } from 'class-transformer';
import { ResponseChartOfAccountDto } from 'src/entities/chart_of_account/dto/response-chart_of_account.dto';
import { ResponseDepositPaymentDto } from 'src/entities/deposit_payment/dto/response-deposit_payment.dto';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';

export class ResponseDepositPaymentItemDto {
  @Expose()
  id: string;

  @Expose()
  description: string;

  @Expose()
  ammount: number;

  @Expose()
  depositPayment: string;

  @Expose()
  subject: string;

  @Expose()
  creditAccountId: string;

  @Expose()
  debitAccountId: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  // Relations
  @Expose()
  @Type(() => ResponseDepositPaymentDto)
  DepositPayment?: ResponseDepositPaymentDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  Subject?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  creditAccount?: ResponseChartOfAccountDto;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  debitAccount?: ResponseChartOfAccountDto;
}
