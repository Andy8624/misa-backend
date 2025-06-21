import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResponseGoodsAndServiceDto } from 'src/entities/goods_and_services/dto/response-goods_and_service.dto';

export interface GoodAndServicePaginationResponseType {
  data: ResponseGoodsAndServiceDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class GoodAndServiceFilterType {
  @ApiPropertyOptional({
    description: 'Search by goods and services name or code',
  })
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
