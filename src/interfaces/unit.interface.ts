import { ResponseUnitDto } from 'src/entities/unit/dto/response-unit.dto';

export interface UnitFilterType {
  pageSize?: number;
  page?: number;
  search?: string;
  customerId?: string;
  status?: string;
}

export interface UnitPaginationResponseType {
  data: ResponseUnitDto[];
  total: number;
  page: number;
  pageSize: number;
}
