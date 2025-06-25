import { Expose, Transform } from 'class-transformer';

export class ResponseCircularDto {
  @Expose()
  id?: string;

  @Expose()
  code?: string; // Mã thông tư (ví dụ: 133, 200, ...)

  @Expose()
  name?: string; // Tên thông tư

  @Expose()
  description?: string; // Mô tả

  @Transform(({ value }) => value?.toISOString())
  @Expose()
  effectiveAt?: Date; // Ngày hiệu lực

  @Transform(({ value }) => value?.toISOString())
  @Expose()
  expiredAt?: Date; // Ngày hết hiệu lực (nếu có)

  @Transform(({ value }) => value?.toISOString())
  @Expose()
  createdAt?: Date;
}
