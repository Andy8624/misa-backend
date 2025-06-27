import { Expose, Transform, Type } from 'class-transformer';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';
import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';
import { ResponseVoucherDto } from 'src/entities/voucher/dto/response-voucher.dto';
import { ResponseProjectDto } from 'src/entities/project/dto/response-project.dto';

export class ResponseSalesContractDto {
  @Expose()
  id: string;

  @Expose()
  @Type(() => ResponseProjectDto)
  Project?: ResponseProjectDto;

  @Expose()
  projectId?: string;

  @Expose()
  contractValue?: number;

  @Expose()
  contractStatus?: string;

  @Expose()
  shipStatus?: string;

  @Expose()
  @Type(() => ResponsePartnerDto)
  Customer?: ResponsePartnerDto;

  @Expose()
  customerId?: string;

  @Expose()
  @Type(() => ResponseEmployeeDto)
  ContactEmloyee?: ResponseEmployeeDto;

  @Expose()
  contactEmployeeId?: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  deliveryDueDate?: Date;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  paymentDueDate?: Date;

  @Expose()
  liquidationValue?: number;

  @Expose()
  otherTerms?: string;

  @Expose()
  deliveryAdress?: string;

  @Expose()
  isCosting: boolean;

  @Expose()
  isInvoiced: boolean;

  @Expose()
  isPreSystemData: boolean;

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
