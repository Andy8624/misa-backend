import { Expose } from 'class-transformer';

export class ResponseUnitDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  status: string;

  @Expose()
  description: string;
}
