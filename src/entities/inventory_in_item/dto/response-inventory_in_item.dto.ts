import { Expose, Transform, Type } from 'class-transformer';
import { ResponseChartOfAccountDto } from 'src/entities/chart_of_account/dto/response-chart_of_account.dto';
import { ResponseGoodsAndServiceDto } from 'src/entities/goods_and_services/dto/response-goods_and_service.dto';
import { ResponseInventoryInDto } from 'src/entities/inventory_in/dto/response-inventory_in.dto';
import { ResponseUnitDto } from 'src/entities/unit/dto/response-unit.dto';
import { ResponseWarehouseDto } from 'src/entities/warehouse/dto/response-warehouse.dto';

export class ResponseInventoryInItemDto {
  @Expose()
  id: string;

  @Expose()
  itemName: string;

  @Expose()
  quantity: number;

  @Expose()
  unitPrice: number;

  @Expose()
  creditAccountId: string;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  creditAccount?: ResponseChartOfAccountDto;

  @Expose()
  debitAccountId: string;

  @Expose()
  @Type(() => ResponseChartOfAccountDto)
  debitAccount?: ResponseChartOfAccountDto;

  @Expose()
  warehouseId: string;

  @Expose()
  @Type(() => ResponseWarehouseDto)
  warehouse?: ResponseWarehouseDto;

  @Expose()
  itemId: string;

  @Expose()
  @Type(() => ResponseGoodsAndServiceDto)
  item?: ResponseGoodsAndServiceDto;

  @Expose()
  inventoryInId: string;

  @Expose()
  @Type(() => ResponseInventoryInDto)
  inventoryIn?: ResponseInventoryInDto;

  @Expose()
  unitId: string;

  @Expose()
  @Type(() => ResponseUnitDto)
  unit?: ResponseUnitDto;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;
}
