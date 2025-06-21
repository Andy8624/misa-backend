import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateBankDto {
  @Expose()
  @IsOptional()
  fullName?: string;

  @Expose()
  @IsOptional()
  shortName?: string;

  @Expose()
  @IsOptional()
  englishName?: string;

  @Expose()
  @IsOptional()
  headquarterAddress?: string;

  @Expose()
  @IsOptional()
  description?: string;

  @Expose()
  @IsOptional()
  logoUrl?: string;

  @Expose()
  @IsOptional()
  companyId?: string;
}
