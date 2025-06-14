import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUnitDto {
  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNotEmpty()
  status: string;

  @Expose()
  @IsOptional()
  description: string;

  @Expose()
  @IsNotEmpty()
  customerId: string;
}
