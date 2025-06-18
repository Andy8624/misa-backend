import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResponseAccountMainSystemDto } from 'src/entities/account_main_system/dto/response-account_main_system.dto';

export interface AccountMainSystemPaginationResponseType {
  data: ResponseAccountMainSystemDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class AccountMainSystemFilterType {
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
