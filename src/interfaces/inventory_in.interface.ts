import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResponseInventoryInDto } from 'src/entities/inventory_in/dto/response-inventory_in.dto';

export interface InventoryInPaginationResponseType {
  data: ResponseInventoryInDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class InventoryInFilterType {
  @ApiPropertyOptional({
    description: 'Search by inventory receipt type',
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
