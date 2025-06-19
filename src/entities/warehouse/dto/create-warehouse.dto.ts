import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateWarehouseDto {
  @Expose()
  @IsNotEmpty({ message: 'Mã không được để trống' })
  code: string;

  @Expose()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;

  @Expose()
  @IsNotEmpty({ message: 'Trạng thái không được để trống' })
  status: string;

  @Expose()
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  address: string;

  @Expose()
  @IsNotEmpty({ message: 'ID tài khoản không được để trống' })
  chartOfAccountId: string;

  @Expose()
  @IsNotEmpty({ message: 'ID công ty không được để trống' })
  customerId: string;
}
