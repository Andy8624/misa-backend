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
  @ApiPropertyOptional({ example: 20, description: 'Số lượng mỗi trang' })
  @IsOptional()
  pageSize?: number;

  @ApiPropertyOptional({ example: 1, description: 'Trang hiện tại' })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Từ khóa tìm kiếm' })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ description: 'ID khách hàng (Công ty)' })
  @IsOptional()
  customerId?: string;
}
