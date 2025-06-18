import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResponseGoodsAndServicesMappingDto } from 'src/entities/goods_and_services_mapping/dto/response-goods_and_services_mapping.dto';

export interface GoodAndServiceMappingPaginationResponseType {
  data: ResponseGoodsAndServicesMappingDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class GoodAndServiceMappingFilterType {
  @ApiPropertyOptional({
    description:
      'Tìm kiếm theo ID dịch vụ hàng hóa hoặc ID nhóm dịch vụ hàng hóa',
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
