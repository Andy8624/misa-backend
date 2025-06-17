import { Expose, Transform } from 'class-transformer';

export class ResponseVatTaxDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  percent: number;

  @Expose()
  customerId: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;
}
