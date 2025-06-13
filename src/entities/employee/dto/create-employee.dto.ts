import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEmployeeDto {
  @Expose()
  @IsNotEmpty({ message: 'Mã nhân viên không được để trống' })
  employeeCode: string; // Mã nhân viên (NV0001)

  @Expose()
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  fullName: string;

  @Expose()
  @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
  @Transform(({ value }) => {
    if (value) {
      const date = new Date(value);
      return date.toISOString();
    }
    return value;
  })
  dob: Date; // Ngày sinh

  @Expose()
  @IsNotEmpty({ message: 'Giới tính không được để trống' })
  sex: string; // Giới tính Male - Female - Other

  @Expose()
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  address: string; // Địa chỉ

  @Expose()
  @IsNotEmpty({ message: 'Chức danh không được để trống' })
  position: string; // Chức danh

  @Expose()
  @IsOptional()
  passportNumber: string; // Số hộ chiếu

  @Expose()
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  phoneNumber: string; // Số điện thoại

  @Expose()
  @IsNotEmpty({ message: 'Số CCCD không được để trống' })
  idCardNumber: string; // Số CCCD

  @Expose()
  @IsNotEmpty({ message: 'Ngày cấp CCCD không được để trống' })
  idCardIssuedDate: string; // Ngày cấp CCCD

  @Expose()
  @IsNotEmpty({ message: 'Nơi cấp CCCD không được để trống' })
  idCardPlaceOfIssue: string; // Nơi cấp CCCD

  @Expose()
  @IsNotEmpty({ message: 'Customer ID không được để trống' })
  customerId: string;
}
