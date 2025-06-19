import { Expose, Transform } from 'class-transformer';

export class ResponseProductionOrderDto {
  @Expose()
  id: string;

  @Expose()
  date: Date;

  @Expose()
  orderNo: number;

  @Expose()
  description: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;
}
