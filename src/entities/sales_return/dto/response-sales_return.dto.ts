import { Expose, Transform, Type } from 'class-transformer';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';
import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';
import { ResponseDepartmentDto } from 'src/entities/department/dto/response-department.dto'; // Giả sử có DTO cho Department
import { ResponseVoucherDto } from 'src/entities/voucher/dto/response-voucher.dto';
import { ResponseOrderItemDto } from 'src/entities/order_item/dto/response-order_item.dto';
import { ResponseSalesReturnCostDto } from 'src/entities/sales_return_cost/dto/response-sales_return_cost.dto';

export class ResponseSalesReturnDto {
  @Expose()
  id: string;

  @Expose()
  voucherGroup?: string;

  @Expose()
  voucherTypeHigh?: string;

  @Expose()
  voucherTypeMedium?: string;

  @Expose()
  isAlsoInventoryReceipt: boolean;

  @Expose()
  invoiceLookupCode?: string;

  @Expose()
  invoiceLookupPath?: string;

  @Expose()
  description?: string;

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
  withOriginalVoucher?: string;

  @Expose()
  deliveryName?: string;

  @Expose()
  recieptName?: string;

  @Expose()
  invoiceNo?: string;

  @Expose()
  invoiceSymbol?: string;

  @Expose()
  @Type(() => ResponseOrderItemDto)
  OtherItem_SalesReturn?: ResponseOrderItemDto[];

  @Expose()
  @Type(() => ResponseSalesReturnCostDto)
  SalesReturnCost_SalesReturn?: ResponseSalesReturnCostDto[];

  @Expose()
  voucherId?: string;

  @Expose()
  @Type(() => ResponseVoucherDto)
  voucher?: ResponseVoucherDto;

  @Expose()
  companyId: string;

  @Expose()
  @Transform(({ value }) => (value ? value.toISOString() : null))
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => (value ? value.toISOString() : null))
  updatedAt?: Date;

  @Expose()
  @Transform(({ value }) => (value ? value.toISOString() : null))
  deletedAt?: Date;
}
