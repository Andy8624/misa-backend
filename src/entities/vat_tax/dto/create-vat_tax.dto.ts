import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateVatTaxDto {
  @Expose()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @Expose()
  @IsNotEmpty({ message: 'Percent cannot be empty' })
  percent: number;

  @Expose()
  @IsNotEmpty({ message: 'Company ID cannot be empty' })
  customerId: string;
}
