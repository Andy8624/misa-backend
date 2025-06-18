import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ResponseVatTaxDto } from 'src/entities/vat_tax/dto/response-vat_tax.dto';

export interface VatTaxPaginationResponseType {
  data: ResponseVatTaxDto[];
  total: number;
  page: number;
  pageSize: number;
}

export class VatTaxFilterType {
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
