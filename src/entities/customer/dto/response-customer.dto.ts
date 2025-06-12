import { Expose, Transform } from 'class-transformer';

export interface CustomerFilterType {
  pageSize?: number;
  page?: number;
  search?: string;
}

export interface CustomerPaginationResponseType {
  data: ResponseCustomerDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class ResponseCustomerDto {
  @Expose()
  id: string;

  @Expose()
  logoUrl: string;

  @Expose()
  businessType: string;

  @Expose()
  taxCode: string;

  @Expose()
  customerName: string;

  @Expose()
  customerGroup: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  foundedDate: Date;

  @Expose()
  vatTaxType: string;

  @Expose()
  customerStatus: string;

  @Expose()
  province: string;

  @Expose()
  district: string;

  @Expose()
  ward: string;

  @Expose()
  streetAddress: string;

  @Expose()
  fullAddress: string;

  @Expose()
  contactName: string;

  @Expose()
  contactPhoneNumber: string;

  @Expose()
  contactEmail: string;

  @Expose()
  contactPosition: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;
}
