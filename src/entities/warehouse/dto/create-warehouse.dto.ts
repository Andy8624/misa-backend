import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateWarehouseDto {
  @Expose()
  @IsNotEmpty({ message: 'Code cannot be empty' })
  code: string;

  @Expose()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @Expose()
  @IsNotEmpty({ message: 'Status cannot be empty' })
  status: string;

  @Expose()
  @IsNotEmpty({ message: 'Address cannot be empty' })
  address: string;

  @Expose()
  @IsNotEmpty({ message: 'Account ID cannot be empty' })
  chartOfAccountId: string;

  @Expose()
  @IsNotEmpty({ message: 'Company ID cannot be empty' })
  customerId: string;
}
