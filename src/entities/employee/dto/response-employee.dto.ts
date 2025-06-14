import { Expose, Transform } from 'class-transformer';

export class ResponseEmployeeDto {
  @Expose()
  id: string;

  @Expose()
  employeeCode: string; // Mã nhân viên (NV0001)

  @Expose()
  fullName: string;

  @Expose()
  dob: Date; // Ngày sinh

  @Expose()
  sex: string; // Giới tính Male - Female - Other

  @Expose()
  address: string; // Địa chỉ

  @Expose()
  position: string; // Chức danh

  @Expose()
  passportNumber: string; // Số hộ chiếu

  @Expose()
  phoneNumber: string; // Số điện thoại

  @Expose()
  idCardNumber: string; // Số CCCD

  @Expose()
  idCardIssuedDate: string; // Ngày cấp CCCD

  @Expose()
  idCardPlaceOfIssue: string; // Nơi cấp CCCD

  @Expose()
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;
}
