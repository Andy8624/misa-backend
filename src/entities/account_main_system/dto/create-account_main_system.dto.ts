import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateAccountMainSystemDto {
  @Expose()
  @IsNotEmpty({ message: 'Mã tài khoản không được để trống' })
  accountCode: string;

  @Expose()
  @IsNotEmpty({ message: 'Tên tài khoản không được để trống' })
  accountName: string;

  @Expose()
  @IsNotEmpty({ message: 'Loại tài khoản không được để trống' })
  accountType: string;

  @Expose()
  @IsNotEmpty({ message: 'Tên tiếng anh tài khoản không được để trống' })
  engAccountName: string;

  @Expose()
  @IsNotEmpty({ message: 'Tên tiếng anh tài khoản không được để trống' })
  describeAccount: string;

  @Expose()
  @IsNotEmpty({ message: 'ID công ty không được để trống' })
  customerId: string;
}
