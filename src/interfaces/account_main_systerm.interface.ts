import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResponseChartOfAccountDto } from 'src/entities/chart_of_account/dto/response-chart_of_account.dto';

export interface ChartOfAccountPaginationResponseType {
  data: ResponseChartOfAccountDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class ChartOfAccountFilterType {
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
