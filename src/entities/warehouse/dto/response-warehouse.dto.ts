import { Expose, Transform } from 'class-transformer';

export class ResponseWarehouseDto {
  @Expose()
  id: string;

  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  status: string;

  @Expose()
  address: string;

  @Expose()
  chartOfAccountId: string;

  @Expose()
  customerId: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;
}
