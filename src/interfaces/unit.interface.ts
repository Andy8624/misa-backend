import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResponseUnitDto } from 'src/entities/unit/dto/response-unit.dto';

// export interface UnitFilterType {
//   pageSize?: number;
//   page?: number;
//   search?: string;
//   customerId?: string;
//   status?: string;
// }

export interface UnitPaginationResponseType {
  data: ResponseUnitDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class UnitFilterType {
  @ApiPropertyOptional({ description: 'Tìm kiếm theo tên hoặc mã nhóm' })
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

  @ApiPropertyOptional({ description: 'Trạng thái của đơn vị' })
  @IsOptional()
  status: string;
}
