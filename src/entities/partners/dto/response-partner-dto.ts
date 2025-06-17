import { Expose, Transform } from 'class-transformer';

export class ResponsePartnerDto {
  @Expose()
  id: string;

  @Expose()
  partnerCode: string;

  @Expose()
  partnerType: string; // Loại đối tác (CLIENT', 'SUPPLIER')

  @Expose()
  legalType: string; // Loại 'organization' or 'individual'

  @Expose()
  taxCode: string; // Mã số thuế

  @Expose()
  govUnitCode: string; // Mã số đơn vị có quan hệ với Ngân sách

  @Expose()
  fullName: string; // Tên

  @Expose()
  address: string; // Địa chỉ

  @Expose()
  phoneNumber: string; // Số điện thoại

  @Expose()
  websiteUrl: string; // Đường dẫn đến website của đối tác (Partners)

  @Expose()
  customerId: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;
}
