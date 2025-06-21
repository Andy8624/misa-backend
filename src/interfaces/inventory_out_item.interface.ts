import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResponseInventoryOutItemDto } from 'src/entities/inventory_out_item/dto/response-inventory_out_item.dto';

export interface InventoryOutItemPaginationResponseType {
  data: ResponseInventoryOutItemDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class InventoryOutItemFilterType {
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
