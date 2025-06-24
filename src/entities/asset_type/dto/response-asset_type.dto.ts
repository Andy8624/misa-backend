import { Expose } from 'class-transformer';

export class ResponseAssetTypeDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  companyId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
