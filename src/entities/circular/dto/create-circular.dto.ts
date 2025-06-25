import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateCircularDto {
  @Expose()
  @IsOptional()
  code?: string; // Mã thông tư (ví dụ: 133, 200, ...)

  @Expose()
  @IsOptional()
  name?: string; // Tên thông tư

  @Expose()
  @IsOptional()
  description?: string; // Mô tả

  @Expose()
  @IsOptional()
  effectiveAt?: Date; // Ngày hiệu lực

  @Expose()
  @IsOptional()
  expiredAt?: Date; // Ngày hết hiệu lực (nếu có)
}
