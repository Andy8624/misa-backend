import { Expose } from 'class-transformer';

export class ResponseWarrantyPeriodDto {
  @Expose()
  id: string;

  @Expose()
  description: string;

  @Expose()
  customerId: string;

  @Expose()
  createdAt: Date;
}
