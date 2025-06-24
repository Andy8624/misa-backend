import { Expose, Transform } from 'class-transformer';
export class ResponseObjectDto {
  @Expose()
  id: string;

  @Expose()
  objectCode?: string; // Mã đối tượng

  @Expose()
  objectName?: string; // Tên đối tượng

  @Expose()
  objectType?: string; // Loại đối tượng

  @Expose()
  companyId?: string; // Quan hệ với bảng công ty

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  updatedAt?: Date;
}
