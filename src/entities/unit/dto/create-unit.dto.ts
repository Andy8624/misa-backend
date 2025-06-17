import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUnitDto {
  @Expose()
  @IsNotEmpty({ message: 'Tên đơn vị không được để trống' })
  name: string;

  @Expose()
  @IsNotEmpty({ message: 'Trạng thái đơn vị không được để trống' })
  status: string;

  @Expose()
  @IsOptional()
  description: string;

  @Expose()
  @IsNotEmpty({ message: 'Id khách hàng (Công ty) không được để trống' })
  customerId: string;
}
