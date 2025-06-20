import { Expose, Transform } from 'class-transformer';

export class ResponseGroupOfPurchaseGoodDto {
  @Expose()
  id: string;

  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;
}
