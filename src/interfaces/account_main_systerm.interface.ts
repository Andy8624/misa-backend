// import { ApiPropertyOptional } from '@nestjs/swagger';
// import { IsOptional } from 'class-validator';
// import { ResponseChartOfAccountDto } from 'src/entities/chart_of_account/dto/response-chart_of_account.dto';

// export interface ChartOfAccountPaginationResponseType {
//   data: ResponseChartOfAccountDto[];
//   total: number;
//   page: number;
//   pageSize: number;
// }

// export class ChartOfAccountFilterType {
//   @ApiPropertyOptional({ example: 20, description: 'Number of items per page' })
//   @IsOptional()
//   pageSize?: number;

//   @ApiPropertyOptional({ example: 1, description: 'Current page' })
//   @IsOptional()
//   page?: number;

//   @ApiPropertyOptional({ description: 'Search keyword' })
//   @IsOptional()
//   search?: string;

//   @ApiPropertyOptional({ description: 'Customer ID (Company)' })
//   @IsOptional()
//   customerId?: string;
// }
