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
