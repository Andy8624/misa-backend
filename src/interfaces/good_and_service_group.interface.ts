import { ResponseGoodsAndServicesGroupDto } from 'src/entities/goods_and_services_group/dto/response-goods_and_services_group.dto';

export interface GoodAndServiceGroupFilterType {
  pageSize?: number;
  page?: number;
  search?: string;
  customerId?: string;
}

export interface GoodAndServiceGroupPaginationResponseType {
  data: ResponseGoodsAndServicesGroupDto[];
  total: number;
  page: number;
  pageSize: number;
}
