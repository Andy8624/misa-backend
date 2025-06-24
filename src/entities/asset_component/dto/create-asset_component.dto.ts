// Create DTO
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateAssetComponentDto {
  @Expose()
  @IsOptional()
  name?: string;

  @Expose()
  @IsOptional()
  unitId?: string;

  @Expose()
  @IsOptional()
  quantity?: number;

  @Expose()
  @IsOptional()
  warrantyPeriod?: number;

  @Expose()
  @IsOptional()
  assetIncrementId?: string;

  @Expose()
  @IsOptional()
  companyId?: string;
}
