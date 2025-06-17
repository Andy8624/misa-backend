import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateVatTaxDto {
  @Expose()
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  name: string;

  @Expose()
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  percent: number;

  @Expose()
  @IsNotEmpty({ message: 'ID công ty không được để trống' })
  customerId: string;
}
