import { Expose } from 'class-transformer';

export class ResponseFileDto {
  @Expose()
  id: string;

  @Expose()
  fileName: string;

  @Expose()
  fileSize: number;

  @Expose()
  mimeType: string;

  @Expose()
  path: string;

  @Expose()
  extension: string;

  @Expose()
  createdAt: Date;
}
