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
    description: 'Tìm kiếm theo loại phiếu nhập',
  })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ description: 'ID công ty' })
  @IsOptional()
  customerId?: string;

  @ApiPropertyOptional({ description: 'Trang hiện tại', example: 1 })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Số lượng mỗi trang', example: 20 })
  @IsOptional()
  pageSize?: number;
}
