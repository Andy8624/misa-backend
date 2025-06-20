import { Expose, Transform, Type } from 'class-transformer';
import { ResponseCashPaymentVoucherItemDto } from 'src/entities/cash-payment-voucher-item/dto/response-cash-payment-voucher-item.dto';
import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';

export class ResponseCashPaymentDto {
  @Expose()
  id: string;

  @Expose()
  cashPaymentVoucherType: string;

  @Expose()
  supplierName: string;

  @Expose()
  address: string;

  @Expose()
  recipient: string;

  @Expose()
  withOriginalVoucher: string;

  @Expose()
  reason: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  postedDate: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  voucherDate: Date;

  @Expose()
  voucherNumber: string;

  @Expose()
  employeeByType: string;

  @Expose()
  employee: string;

  @Expose()
  subject: string;

  @Expose()
  supplier: string;

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
  Supplier?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponseCashPaymentVoucherItemDto)
  CashPaymentVoucherItem?: ResponseCashPaymentVoucherItemDto[];
}
