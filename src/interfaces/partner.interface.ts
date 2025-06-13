import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';

export enum PartnerType {
  CLIENT = 'client',
  SUPPLIER = 'supplier',
}

export enum LegalType {
  ORGANIZATION = 'organization',
  INDIVIDUAL = 'individual',
}

export interface PartnerFilterType {
  pageSize?: number;
  page?: number;
  search?: string;
  partnerType?: 'client' | 'supplier';
  customerId?: string;
}

export interface PartnerPaginationResponseType {
  data: ResponsePartnerDto[];
  total: number;
  page: number;
  pageSize: number;
}
