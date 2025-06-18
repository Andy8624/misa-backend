import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResponseGoodsAndServiceDto } from 'src/entities/goods_and_services/dto/response-goods_and_service.dto';

export interface GoodAndServicePaginationResponseType {
  data: ResponseGoodsAndServiceDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class GoodAndServiceFilterType {
  @ApiPropertyOptional({
    description: 'Tìm kiếm theo tên hoặc mã hàng hóa dịch vụ',
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
