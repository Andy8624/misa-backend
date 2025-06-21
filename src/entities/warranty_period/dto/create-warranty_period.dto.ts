import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateWarrantyPeriodDto {
  @Expose()
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @Expose()
  @IsNotEmpty({ message: 'Company ID cannot be empty' })
  customerId: string;
}
