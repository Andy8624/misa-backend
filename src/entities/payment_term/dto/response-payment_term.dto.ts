import { Expose, Transform } from 'class-transformer';

export class ResponsePaymentTermDto {
  @Expose()
  id: string;

  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;
}
