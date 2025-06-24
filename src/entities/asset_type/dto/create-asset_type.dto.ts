import { IsOptional, IsString } from 'class-validator';

export class CreateAssetTypeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  companyId?: string;
}
