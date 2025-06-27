import { Expose, Transform, Type } from 'class-transformer';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';
import { ResponseCustomerDto } from 'src/entities/customer/dto/response-customer.dto'; // Giả sử có DTO cho Customer
import { ResponseSalesContractDto } from 'src/entities/sales_contract/dto/response-sales_contract.dto';

export class ResponseProjectDto {
  @Expose()
  id: string;

  @Expose()
  code?: string;

  @Expose()
  description?: string;

  @Expose()
  @Type(() => ResponsePartnerDto)
  Customer?: ResponsePartnerDto;

  @Expose()
  customerId?: string;

  @Expose()
  @Type(() => ResponseCustomerDto)
  Company?: ResponseCustomerDto;

  @Expose()
  companyId: string;

  @Expose()
  @Type(() => ResponseSalesContractDto)
  SalesContract_Project?: ResponseSalesContractDto[];

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
