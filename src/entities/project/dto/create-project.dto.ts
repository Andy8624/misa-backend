import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @Expose()
  @IsOptional()
  code?: string;

  @Expose()
  @IsOptional()
  description?: string;

  @Expose()
  @IsOptional()
  customerId?: string;

  @Expose()
  @IsNotEmpty({ message: 'Company ID cannot be empty' })
  companyId: string;
}
