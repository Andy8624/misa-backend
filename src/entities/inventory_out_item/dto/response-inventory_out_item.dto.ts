import { Expose, Transform, Type } from 'class-transformer';
import { ResponseChartOfAccountDto } from 'src/entities/chart_of_account/dto/response-chart_of_account.dto';
import { ResponseGoodsAndServiceDto } from 'src/entities/goods_and_services/dto/response-goods_and_service.dto';
import { ResponseInventoryOutDto } from 'src/entities/inventory_out/dto/response-inventory_out.dto';
import { ResponseProductionOrderDto } from 'src/entities/production_order/dto/response-production_order.dto';
import { ResponseUnitDto } from 'src/entities/unit/dto/response-unit.dto';
import { ResponseWarehouseDto } from 'src/entities/warehouse/dto/response-warehouse.dto';

export class ResponseInventoryOutItemDto {
  @Expose()
  id: string;

  @Expose()
  itemName: string;

  @Expose()
  quantity: number;

  @Expose()
  unitPrice: number;

  @Expose()
  finishedGood: string;

  @Expose()
  costClassification: string;

  @Expose()
  costObject: string;

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
  inventoryOutId: string;

  @Expose()
  @Type(() => ResponseInventoryOutDto)
  inventoryOut?: ResponseInventoryOutDto;

  @Expose()
  unitId: string;

  @Expose()
  @Type(() => ResponseUnitDto)
  unit?: ResponseUnitDto;

  @Expose()
  productionOrdersId: string;

  @Expose()
  @Type(() => ResponseProductionOrderDto)
  productionOrders?: ResponseProductionOrderDto;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;
}
