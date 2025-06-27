import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSalesReturnCostDto {
  @Expose()
  @IsOptional()
  goodId?: string;

  @Expose()
  @IsOptional()
  warehouseId?: string;

  @Expose()
  @IsOptional()
  warehouseAccountId?: string;

  @Expose()
  @IsOptional()
  cogsAccountId?: string;

  @Expose()
  @IsOptional()
  quantity?: number;

  @Expose()
  @IsOptional()
  unitPrice?: number;

  @Expose()
  @IsOptional()
  totalCost?: number;

  @Expose()
  @IsOptional()
  salesReturnId?: string;

  @Expose()
  @IsNotEmpty({ message: 'Company ID cannot be empty' })
  companyId: string;
}
