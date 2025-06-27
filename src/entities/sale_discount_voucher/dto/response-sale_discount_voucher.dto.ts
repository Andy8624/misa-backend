import { Expose, Transform, Type } from 'class-transformer';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';
import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';
import { ResponseDepartmentDto } from 'src/entities/department/dto/response-department.dto'; // Giả sử có DTO cho Department
import { ResponseVoucherDto } from 'src/entities/voucher/dto/response-voucher.dto';
import { ResponseBankAccountDto } from 'src/entities/bank_account/dto/response-bank_account.dto';
import { ResponseOrderItemDto } from 'src/entities/order_item/dto/response-order_item.dto';

export class ResponseSaleDiscountVoucherDto {
  @Expose()
  id: string;

  @Expose()
  voucherType?: string;

  @Expose()
  typeInside?: string;

  @Expose()
  @Type(() => ResponsePartnerDto)
  Customer?: ResponsePartnerDto;

  @Expose()
  customerId?: string;

  @Expose()
  @Type(() => ResponseEmployeeDto)
  Employee?: ResponseEmployeeDto;

  @Expose()
  employeeId?: string;

  @Expose()
  @Type(() => ResponseDepartmentDto)
  Department?: ResponseDepartmentDto;

  @Expose()
  departmentId?: string;

  @Expose()
  voucherId?: string;

  @Expose()
  @Type(() => ResponseVoucherDto)
  voucher?: ResponseVoucherDto;

  @Expose()
  description?: string;

  @Expose()
  invoiceLookupCode?: string;

  @Expose()
  invoiceLookupPath?: string;

  @Expose()
  invoiceNo?: string;

  @Expose()
  invoiceSymbol?: string;

  @Expose()
  taxCode?: string;

  @Expose()
  paymentType?: string;

  @Expose()
  @Type(() => ResponseBankAccountDto)
  BankAccount?: ResponseBankAccountDto;

  @Expose()
  bankAccountId?: string;

  @Expose()
  @Type(() => ResponseOrderItemDto)
  OrderItem_SaleDiscountVoucher?: ResponseOrderItemDto[];

  @Expose()
  companyId: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  updatedAt?: Date;
}
