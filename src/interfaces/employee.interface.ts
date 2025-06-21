import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';

export interface EmployeePaginationResponseType {
  data: ResponseEmployeeDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class EmployeeFilterType {
  @ApiPropertyOptional({ example: 20, description: 'Number of items per page' })
  @IsOptional()
  pageSize?: number;

  @ApiPropertyOptional({ example: 1, description: 'Current page number' })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Search keyword' })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ description: 'Customer ID (Company)' })
  @IsOptional()
  customerId?: string;
}
