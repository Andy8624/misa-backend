import { Expose, Transform, Type } from 'class-transformer';
import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';

export class ResponseInventoryInDto {
  @Expose()
  id: string;

  @Expose()
  inventoryInVoucherType: string;

  @Expose()
  address: string;

  @Expose()
  courier: string; // Người giao hàng

  @Expose()
  description: string;

  @Expose()
  withOriginalVoucher: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  postedDate: Date;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  voucherDate: Date;

  @Expose()
  voucherNumber: string;

  @Expose()
  costOfInventoryReturned: string;

  @Expose()
  storePersonId: string;

  @Expose()
  @Type(() => ResponseEmployeeDto)
  storePerson?: ResponseEmployeeDto[];

  @Expose()
  clientId: string;

  @Expose()
  @Type(() => ResponsePartnerDto)
  client?: ResponsePartnerDto[];

  @Expose()
  objectId: string;

  @Expose()
  @Type(() => ResponsePartnerDto)
  object?: ResponsePartnerDto[];

  @Expose()
  companyId: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;
}
