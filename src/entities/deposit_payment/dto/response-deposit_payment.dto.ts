import { Expose, Transform, Type } from 'class-transformer';
import { ResponseBankAccountDto } from 'src/entities/bank_account/dto/response-bank_account.dto';
import { ResponseDepositPaymentItemDto } from 'src/entities/deposit_payment_item/dto/response-deposit_payment_item.dto';
import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';
// import { ResponseFileDto } from 'src/entities/file/dto/response-file.dto';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';

export class ResponseDepositPaymentDto {
  @Expose()
  id: string;

  @Expose()
  depositPaymentType: string;

  @Expose()
  paymentMethod: string;

  @Expose()
  paymentBankName: string;

  @Expose()
  address: string;

  @Expose()
  receipBankName: string;

  @Expose()
  description: string;

  @Expose()
  idCardNo: string;

  @Expose()
  issuedBy: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  issuedDate: Date;

  @Expose()
  voucherNumber: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  voucherDate: Date;

  @Expose()
  employee: string;

  @Expose()
  employeeByType: string;

  @Expose()
  bank: string;

  @Expose()
  supplier: string;

  @Expose()
  subject: string;

  @Expose()
  attached: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  // Relations
  @Expose()
  @Type(() => ResponseEmployeeDto)
  Employee?: ResponseEmployeeDto;

  @Expose()
  @Type(() => ResponseEmployeeDto)
  EmployeeByType?: ResponseEmployeeDto;

  @Expose()
  @Type(() => ResponseBankAccountDto)
  Bank?: ResponseBankAccountDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  Supplier?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  Subject?: ResponsePartnerDto;

  // @Expose()
  // @Type(() => ResponseFileDto)
  // Attached?: ResponseFileDto;

  @Expose()
  @Type(() => ResponseDepositPaymentItemDto)
  DepositPaymentItem_DepositPayment?: ResponseDepositPaymentItemDto;
}
