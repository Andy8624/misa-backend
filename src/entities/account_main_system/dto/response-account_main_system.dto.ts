import { Expose } from 'class-transformer';

export class ResponseAccountMainSystemDto {
  @Expose()
  id: string;

  @Expose()
  accountCode: string;

  @Expose()
  accountName: string;

  @Expose()
  accountType: string;

  @Expose()
  engAccountName: string;

  @Expose()
  describeAccount: string;

  @Expose()
  customerId: string;

  @Expose()
  createdAt: Date;
}
