import { Expose, Transform, Type } from 'class-transformer';
import { ResponseChartOfAccountDto } from 'src/entities/chart_of_account/dto/response-chart_of_account.dto';
import { ResponseDepositReceipDto } from 'src/entities/deposit_receip/dto/response-deposit_receip.dto';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';

export class ResponseDepositReceipItemDto {
  @Expose()
  id: string;

  @Expose()
  description: string;

  @Expose()
  ammount: number;

  @Expose()
  depositReceip: string;

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
  @Type(() => ResponseDepositReceipDto)
  DepositReceip?: ResponseDepositReceipDto;

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
