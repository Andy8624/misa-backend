import { Expose, Transform, Type } from 'class-transformer';
import { ResponseWarehouseDto } from 'src/entities/warehouse/dto/response-warehouse.dto'; // Giả sử có DTO cho Warehouse
import { ResponseChartOfAccountDto } from 'src/entities/chart_of_account/dto/response-chart_of_account.dto';
import { ResponseSalesReturnDto } from 'src/entities/sales_return/dto/response-sales_return.dto';
import { ResponseGoodsAndServiceDto } from 'src/entities/goods_and_services/dto/response-goods_and_service.dto';

export class ResponseSalesReturnCostDto {
  @Expose()
  id: string;

  @Expose()
  @Type(() => ResponseGoodsAndServiceDto)
  Goods?: ResponseGoodsAndServiceDto;

  @Expose()
  goodId?: string;

  @Expose()
  @Type(() => ResponseWarehouseDto)
  Warehouse?: ResponseWarehouseDto;

  @Expose()
  warehouseId?: string;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  WarehouseAccount?: ResponseChartOfAccountDto;

  @Expose()
  warehouseAccountId?: string;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  CogsAccount?: ResponseChartOfAccountDto;

  @Expose()
  cogsAccountId?: string;

  @Expose()
  quantity?: number;

  @Expose()
  unitPrice?: number;

  @Expose()
  totalCost?: number;

  @Expose()
  @Type(() => ResponseSalesReturnDto)
  SalesReturn?: ResponseSalesReturnDto;

  @Expose()
  salesReturnId?: string;

  @Expose()
  companyId: string;

  @Expose()
  @Transform(({ value }) => (value ? value.toISOString() : null))
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => (value ? value.toISOString() : null))
  updatedAt?: Date;

  @Expose()
  @Transform(({ value }) => (value ? value.toISOString() : null))
  deletedAt?: Date;
}
