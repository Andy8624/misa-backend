import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUnitDto {
  @Expose()
  @IsNotEmpty({ message: 'Unit name cannot be empty' })
  name: string;

  @Expose()
  @IsNotEmpty({ message: 'Unit status cannot be empty' })
  status: string;

  @Expose()
  @IsOptional()
  description: string;

  @Expose()
  @IsNotEmpty({ message: 'Customer ID (Company) cannot be empty' })
  customerId: string;
}
