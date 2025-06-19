import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateInventoryOutItemDto {
  @Expose()
  @IsOptional()
  itemName?: string;

  @Expose()
  @IsOptional()
  quantity?: number;

  @Expose()
  @IsOptional()
  unitPrice?: number;

  @Expose()
  @IsOptional()
  finishedGood?: string;

  @Expose()
  @IsOptional()
  costClassification?: string;

  @Expose()
  @IsOptional()
  costObject?: string;

  @Expose()
  @IsOptional()
  creditAccountId?: string;

  @Expose()
  @IsOptional()
  debitAccountId?: string;

  @Expose()
  @IsOptional()
  warehouseId?: string;

  @Expose()
  @IsOptional()
  itemId?: string;

  @Expose()
  @IsOptional()
  inventoryOutId?: string;

  @Expose()
  @IsOptional()
  unitId?: string;

  @Expose()
  @IsOptional()
  productionOrdersId?: string;
}
