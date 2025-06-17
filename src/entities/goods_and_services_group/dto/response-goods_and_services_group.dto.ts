import { Expose, Transform } from 'class-transformer';

export class ResponseGoodsAndServicesGroupDto {
  @Expose()
  id: string;

  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  status: string;

  @Expose()
  parentGroupId: string;

  @Expose()
  @Transform(({ value }) => value.toISOString())
  createdAt: Date;
}
