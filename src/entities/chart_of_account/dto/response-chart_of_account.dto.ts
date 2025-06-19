import { Expose } from 'class-transformer';

export class ResponseChartOfAccountDto {
  @Expose()
  id: string;

  @Expose()
  accountNumber: string;

  @Expose()
  accountName: string;

  @Expose()
  particular: string;

  @Expose()
  englishName: string;

  @Expose()
  characteristics: string;

  @Expose()
  primaryAccountId?: string;

  @Expose()
  customerId: string;

  @Expose()
  createdAt: Date;
}
