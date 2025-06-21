import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';

export enum PartnerType {
  CLIENT = 'client',
  SUPPLIER = 'supplier',
}

export enum LegalType {
  ORGANIZATION = 'organization',
  INDIVIDUAL = 'individual',
}

export interface PartnerPaginationResponseType {
  data: ResponsePartnerDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class PartnerFilterType {
  @ApiPropertyOptional({ example: 20, description: 'Number of items per page' })
  @IsOptional()
  pageSize?: number;

  @ApiPropertyOptional({ example: 1, description: 'Current page' })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Search keyword' })
  @IsOptional()
  search?: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: 'client',
    description: 'Partner type - Customer: "client" - Supplier: "supplier"',
  })
  partnerType?: PartnerType;

  @ApiPropertyOptional({ description: 'Customer ID (Company)' })
  @IsOptional()
  customerId?: string;
}
