import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateAccountantDto {
  @Expose()
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  fullName: string;

  @Expose()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @Expose()
  @Matches(/^(0)(9|3|7|8|5)[0-9]{8}$/, {
    message: 'Số điện thoại không hợp lệ',
  })
  phoneNumber: string;

  @Expose()
  @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
  birthDate: Date;

  @Expose()
  @IsNotEmpty({ message: 'Giới tính không được để trống' })
  gender: string;

  @Expose()
  avatarUrl: string;

  @Expose()
  address: string;

  @Expose()
  zipCode: string;

  @Expose()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;
}
