import {
  IsEmail,
  IsNotEmpty,
  IsIn,
  IsOptional,
  Matches,
} from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class CreateCustomerDto {
  @Expose()
  @IsOptional()
  logoUrl?: string;

  @Expose()
  @IsNotEmpty({ message: 'Loại hình doanh nghiệp không được để trống' })
  @IsIn(['Doanh nghiệp', 'Hộ kinh doanh'], {
    message: 'Loại hình doanh nghiệp không hợp lệ',
  })
  businessType: string;

  @Expose()
  @IsNotEmpty({ message: 'Mã số thuế không được để trống' })
  taxCode: string;

  @Expose()
  @IsNotEmpty({ message: 'Tên khách hàng không được để trống' })
  customerName: string;

  @Expose()
  @IsOptional()
  customerGroup?: string;

  @Expose()
  @IsNotEmpty({ message: 'Ngày thành lập không được để trống' })
  @Transform(({ value }) => {
    if (value) {
      const date = new Date(value);
      return date.toISOString();
    }
    return value;
  })
  foundedDate: Date;

  @Expose()
  @IsNotEmpty({ message: 'Loại kê khai thuế GTGT không được để trống' })
  @IsIn(['month', 'quarter'], {
    message: 'Loại kê khai thuế GTGT không hợp lệ',
  })
  vatTaxType: string;

  @Expose()
  @IsNotEmpty({ message: 'Trạng thái khách hàng không được để trống' })
  customerStatus: string;

  @Expose()
  @IsNotEmpty({ message: 'Tỉnh/Thành phố không được để trống' })
  province: string;

  @Expose()
  @IsNotEmpty({ message: 'Quận/Huyện không được để trống' })
  district: string;

  @Expose()
  @IsOptional()
  ward?: string;

  @Expose()
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  streetAddress: string;

  @Expose()
  @IsNotEmpty({ message: 'Địa chỉ đầy đủ không được để trống' })
  fullAddress: string;

  @Expose()
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  fullName: string;

  @Expose()
  @Matches(/^(0)(9|3|7|8|5)[0-9]{8}$/, {
    message: 'Số điện thoại không hợp lệ',
  })
  phoneNumber: string;

  @Expose()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @Expose()
  @IsNotEmpty({ message: 'Chức danh không được để trống' })
  position: string;
}
