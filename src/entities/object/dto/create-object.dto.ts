import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateObjectDto {
  @Expose()
  @IsOptional()
  objectCode?: string; // Mã đối tượng

  @Expose()
  @IsOptional()
  objectName?: string; // Tên đối tượng

  @Expose()
  @IsOptional()
  objectType?: string; // Loại đối tượng

  @Expose()
  @IsOptional()
  companyId?: string; // Quan hệ với bảng công ty
}
