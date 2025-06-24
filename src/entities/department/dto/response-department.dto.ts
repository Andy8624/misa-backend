import { Expose } from 'class-transformer';

export class ResponseDepartmentDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  description: string;

  @Expose()
  companyId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
