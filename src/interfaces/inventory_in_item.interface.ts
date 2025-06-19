import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResponseInventoryInItemDto } from 'src/entities/inventory_in_item/dto/response-inventory_in_item.dto';

export interface InventoryInItemPaginationResponseType {
  data: ResponseInventoryInItemDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class InventoryInItemFilterType {
  @ApiPropertyOptional({
    description: 'Tìm kiếm',
  })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ description: 'Trang hiện tại', example: 1 })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Số lượng mỗi trang', example: 20 })
  @IsOptional()
  pageSize?: number;
}
