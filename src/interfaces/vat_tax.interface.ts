import { ResponseVatTaxDto } from 'src/entities/vat_tax/dto/response-vat_tax.dto';

export interface VatTaxFilterType {
  pageSize?: number;
  page?: number;
  search?: string;
  customerId?: string;
}

export interface VatTaxPaginationResponseType {
  data: ResponseVatTaxDto[];
  total: number;
  page: number;
  pageSize: number;
}
