import { Exclude, Expose, Transform } from 'class-transformer';
import { IsEmail, IsIn, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty({
    message: 'Tên người dùng không được để trống',
  })
  fullName: string;

  // Regex cho số điện thoại Việt Nam:
  // - Bắt đầu bằng số 0
  // - Tiếp theo là 9 hoặc 3 hoặc 7 hoặc 8 hoặc 5
  // - Theo sau bởi 8 số
  // Ví dụ hợp lệ: 0912345678, 0323456789, 0791234567
  @Matches(/^(0)(9|3|7|8|5)[0-9]{8}$/, {
    message:
      'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam 10 số',
  })
  @IsNotEmpty({
    message: 'Số điện thoại không được để trống',
  })
  phoneNumber: string;

  @IsEmail(
    {},
    {
      message: 'Email không hợp lệ',
    },
  )
  @IsNotEmpty({
    message: 'Email không được để trống',
  })
  email: string;

  @IsNotEmpty({
    message: 'Ngày sinh không được để trống',
  })
  @Transform(({ value }) => new Date(value))
  birthDate: Date;

  @IsNotEmpty({
    message: 'Giới tính không được để trống',
  })
  @IsIn(['male', 'female', 'other'], {
    message: 'Giới tính phải là một trong các giá trị: male, female, other',
  })
  gender: string;

  @IsNotEmpty({
    message: 'Mật khẩu không được để trống',
  })
  @MinLength(6, {
    message: 'Mật khẩu phải có ít nhất 6 ký tự',
  })
  password: string;
}

export class LoginDTO {
  @IsEmail(
    {},
    {
      message: 'Email không hợp lệ',
    },
  )
  @IsNotEmpty({
    message: 'Email không được để trống',
  })
  email: string;

  @IsNotEmpty({
    message: 'Mật khẩu không được để trống',
  })
  password: string;
}

export class AuthResponseDto {
  @Expose()
  access_token: string;

  @Exclude()
  // Cái này mốt có xài thì gửi qua cookies
  refresh_token: string;
}

export class RegisterResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  fullName: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  birthDate: Date;

  @Expose()
  gender: string;

  @Expose()
  createdAt: Date;
}

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu cũ không được để trống' })
  oldPassword: string;

  @IsNotEmpty({ message: 'Mật khẩu mới không được để trống' })
  @MinLength(6, { message: 'Mật khẩu mới phải có ít nhất 6 ký tự' })
  newPassword: string;
}
