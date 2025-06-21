import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResponseGoodsAndServicesGroupDto } from 'src/entities/goods_and_services_group/dto/response-goods_and_services_group.dto';

export interface GoodAndServiceGroupPaginationResponseType {
  data: ResponseGoodsAndServicesGroupDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class GoodAndServiceGroupFilterType {
  @ApiPropertyOptional({ description: 'Search by name or group code' })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ description: 'Company ID' })
  @IsOptional()
  customerId?: string;

  @ApiPropertyOptional({ description: 'Current page', example: 1 })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Items per page', example: 20 })
  @IsOptional()
  pageSize?: number;
}
