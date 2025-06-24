// Create DTO
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateAssetAllocationDto {
  @Expose()
  @IsOptional()
  ratioPercent?: number;

  @Expose()
  @IsOptional()
  costItem?: string;

  @Expose()
  @IsOptional()
  statisticCode?: string;

  @Expose()
  @IsOptional()
  assetIncrementId?: string;

  @Expose()
  @IsOptional()
  expenseAccountId?: string;

  @Expose()
  @IsOptional()
  objectId?: string;

  @Expose()
  @IsOptional()
  companyId?: string;
}
