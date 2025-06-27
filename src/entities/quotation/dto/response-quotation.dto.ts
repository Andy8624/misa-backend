import { Expose, Transform, Type } from 'class-transformer';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';
import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';
import { ResponseVoucherDto } from 'src/entities/voucher/dto/response-voucher.dto'; // Giả sử có DTO cho Voucher
import { ResponseOrderItemDto } from 'src/entities/order_item/dto/response-order_item.dto';

export class ResponseQuotationDto {
  @Expose()
  id: string;

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
  @Type(() => ResponseEmployeeDto)
  ContactEmloyee?: ResponseEmployeeDto;

  @Expose()
  contactEmployeeId?: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  expiredAt?: Date;

  @Expose()
  taxCode?: string;

  @Expose()
  description?: string;

  @Expose()
  voucherId?: string;

  @Expose()
  @Type(() => ResponseVoucherDto)
  voucher?: ResponseVoucherDto;

  @Expose()
  @Type(() => ResponseOrderItemDto)
  OrderItem_Quotation?: ResponseOrderItemDto[];

  @Expose()
  companyId: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  updatedAt?: Date;
}
