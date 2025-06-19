import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateInventoryInItemDto {
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
  inventoryInId?: string;

  @Expose()
  @IsOptional()
  unitId?: string;
}
