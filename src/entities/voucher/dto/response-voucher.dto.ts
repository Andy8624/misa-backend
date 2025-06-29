import { Expose, Transform, Type } from 'class-transformer';
import { ResponseFileDto } from 'src/entities/file/dto/response-file.dto';

export class ResponseVoucherDto {
  @Expose()
  id: string;

  @Expose()
  voucherType: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  postedDate?: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  voucherDate?: Date;

  @Expose()
  voucherNumber?: string;

  @Expose()
  companyId?: string;

  @Expose()
  circularId?: string;

  @Expose()
  @Type(() => ResponseFileDto)
  File?: ResponseFileDto;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  updatedAt?: Date;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  deletedAt?: Date;
}
