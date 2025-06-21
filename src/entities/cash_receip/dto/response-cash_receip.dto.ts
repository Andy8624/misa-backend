import { Expose, Transform, Type } from 'class-transformer';
import { ResponseCashReceipVoucherItemDto } from 'src/entities/cash_receip_voucher_item/dto/response-cash_receip_voucher_item.dto';
import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';

export class ResponseCashReceipDto {
  @Expose()
  id: string;

  @Expose()
  cashReceiptVoucherType: string;

  @Expose()
  payer: string;

  @Expose()
  address: string;

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
  withOriginalVoucher: string;

  @Expose()
  employeeByType: string;

  @Expose()
  employee: string;

  @Expose()
  subject: string;

  @Expose()
  customer: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  // Relations
  @Expose()
  @Type(() => ResponseEmployeeDto)
  EmployeeByType?: ResponseEmployeeDto;

  @Expose()
  @Type(() => ResponseEmployeeDto)
  Employee?: ResponseEmployeeDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  Subject?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponsePartnerDto)
  Customer?: ResponsePartnerDto;

  // CashReceipVoucherItem relation
  @Expose()
  @Type(() => ResponseCashReceipVoucherItemDto)
  CashReceipVoucherItem?: ResponseCashReceipVoucherItemDto[];
}
