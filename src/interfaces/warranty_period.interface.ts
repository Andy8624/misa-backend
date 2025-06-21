import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';

export interface WarrantyPeriodPaginationResponseType {
  data: ResponseEmployeeDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class WarrantyPeriodFilterType {
  @ApiPropertyOptional({ example: 20, description: 'Number of items per page' })
  @IsOptional()
  pageSize?: number;

  @ApiPropertyOptional({ example: 1, description: 'Current page' })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Search keyword' })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ description: 'Customer ID (Company)' })
  @IsOptional()
  customerId?: string;
}
