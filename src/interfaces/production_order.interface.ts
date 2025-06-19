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
