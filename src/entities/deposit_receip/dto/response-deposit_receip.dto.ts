import { Expose, Transform, Type } from 'class-transformer';
import { ResponseBankAccountDto } from 'src/entities/bank_account/dto/response-bank_account.dto';
import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';
import { ResponseVoucherDto } from 'src/entities/voucher/dto/response-voucher.dto';

export class ResponseDepositReceipDto {
  @Expose()
  id: string;

  @Expose()
  depositReceipType: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  postedDate: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  voucherDate: Date;

  @Expose()
  voucherNumber: string;

  @Expose()
  reason: string;

  @Expose()
  debtCollector: string;

  @Expose()
  employee: string;

  @Expose()
  subject: string;

  @Expose()
  customer: string;

  @Expose()
  bank: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  // Relations
  @Expose()
  @Type(() => ResponseEmployeeDto)
  DebtCollector?: ResponseEmployeeDto;

  @Expose()
  @Type(() => ResponseEmployeeDto)
  Employee?: ResponseEmployeeDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  Subject?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  Customer?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponseBankAccountDto)
  Bank?: ResponseBankAccountDto;

  @Expose()
  @Type(() => ResponseVoucherDto)
  voucher?: ResponseVoucherDto;
}
