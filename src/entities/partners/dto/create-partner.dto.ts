import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { LegalType, PartnerType } from 'src/interfaces/partner.interface';

export class CreatePartnerDto {
  @Expose()
  @IsNotEmpty({ message: 'Mã đối tác không được để trống' })
  partnerCode: string;

  @Expose()
  @IsNotEmpty({ message: 'Loại đối tác không được để trống' })
  @IsEnum(PartnerType, {
    message: 'Loại đối tác phải là client hoặc supplier',
  })
  partnerType: PartnerType; // Loại đối tác 'client' | 'supplier' (KH - NCC)

  @Expose()
  @IsNotEmpty({ message: 'Loại hình doanh nghiệp không được để trống' })
  @IsEnum(LegalType, {
    message: 'Loại hình doanh nghiệp phải là organization hoặc individual',
  })
  legalType: LegalType; // Loại hình doanh nghiệp (Cá nhân - tổ chức) ('organization' | 'individual')

  @Expose()
  @IsNotEmpty({ message: 'Mã số thuế không được để trống' })
  taxCode: string; // Mã số thuế

  @Expose()
  @IsNotEmpty({
    message: 'Mã số đơn vị có quan hệ với Ngân sách không được để trống',
  })
  govUnitCode: string; // Mã số đơn vị có quan hệ với Ngân sách

  @Expose()
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  fullName: string; // Tên

  @Expose()
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  address: string; // Địa chỉ

  @Expose()
  @Matches(/^(0)(9|3|7|8|5)[0-9]{8}$/, {
    message: 'Số điện thoại không hợp lệ',
  })
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  phoneNumber: string; // Số điện thoại

  @Expose()
  @IsOptional()
  websiteUrl: string; // Đường dẫn đến website của đối tác (Partners)

  @Expose()
  @IsNotEmpty({ message: 'Id khách hàng không được để trống' })
  customerId: string;
}
