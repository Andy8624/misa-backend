import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateWarrantyPeriodDto {
  @Expose()
  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  description: string;

  @Expose()
  @IsNotEmpty({ message: 'ID công ty không được để trống' })
  customerId: string;
}
