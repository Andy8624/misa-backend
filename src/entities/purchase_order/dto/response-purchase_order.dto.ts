import { Expose, Transform, Type } from 'class-transformer';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';
import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';
import { ResponseVoucherDto } from 'src/entities/voucher/dto/response-voucher.dto'; // Giả sử có DTO cho Voucher
import { ResponsePaymentTermDto } from 'src/entities/payment_term/dto/response-payment_term.dto';
import { ResponseOrderItemDto } from 'src/entities/order_item/dto/response-order_item.dto';

export class ResponsePurchaseOrderDto {
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
  taxCode?: string;

  @Expose()
  recipientName?: string;

  @Expose()
  description?: string;

  @Expose()
  @Type(() => ResponsePaymentTermDto)
  PaymentTerm?: ResponsePaymentTermDto;

  @Expose()
  paymentTermId?: string;

  @Expose()
  creditDays?: number;

  @Expose()
  isCosting: boolean;

  @Expose()
  orderStatus?: string;

  @Expose()
  deliveryStatus?: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  deliveryDate?: Date;

  @Expose()
  deliveryAddress?: string;

  @Expose()
  @Type(() => ResponseOrderItemDto)
  OrderItem_Purchase?: ResponseOrderItemDto[];

  @Expose()
  voucherId?: string;

  @Expose()
  @Type(() => ResponseVoucherDto)
  voucher?: ResponseVoucherDto;

  @Expose()
  companyId: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  updatedAt?: Date;
}
