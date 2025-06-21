import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResponseWarehouseDto } from 'src/entities/warehouse/dto/response-warehouse.dto';

export interface WarehousePaginationResponseType {
  data: ResponseWarehouseDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class WarehouseFilterType {
  @ApiPropertyOptional({ example: 20, description: 'Number of items per page' })
  @IsOptional()
  pageSize?: number;

  @ApiPropertyOptional({ example: 1, description: 'Current page' })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Search keyword' })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ description: 'Customer ID (Company)' })
  @IsOptional()
  customerId?: string;
}
