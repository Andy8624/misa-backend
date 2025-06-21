import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResponseInventoryOutDto } from 'src/entities/inventory_out/dto/response-inventory_out.dto';

export interface InventoryOutPaginationResponseType {
  data: ResponseInventoryOutDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class InventoryOutFilterType {
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
