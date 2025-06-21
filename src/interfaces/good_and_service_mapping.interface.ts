import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResponseGoodsAndServicesMappingDto } from 'src/entities/goods_and_services_mapping/dto/response-goods_and_services_mapping.dto';

export interface GoodAndServiceMappingPaginationResponseType {
  data: ResponseGoodsAndServicesMappingDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class GoodAndServiceMappingFilterType {
  @ApiPropertyOptional({
    description:
      'Search by goods and services ID or goods and services group ID',
  })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ description: 'Current page', example: 1 })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Items per page', example: 20 })
  @IsOptional()
  pageSize?: number;
}
