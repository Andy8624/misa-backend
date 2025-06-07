import { Exclude, Expose, Transform } from 'class-transformer';

export class ResponseAccountantDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  fullName: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  birthDate: Date;

  @Expose()
  gender: string;

  @Expose()
  avatarUrl: string;

  @Expose()
  address: string;

  @Expose()
  zipCode: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  updatedAt: Date;

  @Exclude()
  password: string;
}

export interface AccountantFilterType {
  pageSize?: number;
  page?: number;
  search?: string;
}

export interface AccountantPaginationResponseType {
  data: ResponseAccountantDto[];
  total: number;
  page: number;
  pageSize: number;
}
