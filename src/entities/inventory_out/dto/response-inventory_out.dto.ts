import { Expose, Transform, Type } from 'class-transformer';
import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';

export class ResponseInventoryOutDto {
  @Expose()
  id: string;

  @Expose()
  inventoryOutVoucherType: string;

  @Expose()
  address: string;

  @Expose()
  receipient: string;

  @Expose()
  particular: string;

  @Expose()
  withOriginalVoucher: string;

  @Expose()
  component: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  postedDate: Date;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  voucherDate: Date;

  @Expose()
  voucherNumber: string;

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
  customerId: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;
}
