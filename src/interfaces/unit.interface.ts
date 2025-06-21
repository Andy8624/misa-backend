import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResponseUnitDto } from 'src/entities/unit/dto/response-unit.dto';

export interface UnitPaginationResponseType {
  data: ResponseUnitDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class UnitFilterType {
  @ApiPropertyOptional({ description: 'Search by name or group code' })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ description: 'Company ID' })
  @IsOptional()
  customerId?: string;

  @ApiPropertyOptional({ description: 'Current page', example: 1 })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Items per page', example: 20 })
  @IsOptional()
  pageSize?: number;

  @ApiPropertyOptional({ description: 'Unit status' })
  @IsOptional()
  status: string;
}
