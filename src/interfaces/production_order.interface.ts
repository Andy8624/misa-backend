import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResponseProductionOrderDto } from 'src/entities/production_order/dto/response-production_order.dto';

export interface ProductionOrderPaginationResponseType {
  data: ResponseProductionOrderDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class ProductionOrderFilterType {
  @ApiPropertyOptional({
    description: 'Search',
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
