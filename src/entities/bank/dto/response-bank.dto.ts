import { Expose, Transform } from 'class-transformer';

export class ResponseBankDto {
  @Expose()
  id: string;

  @Expose()
  fullName: string;

  @Expose()
  shortName: string;

  @Expose()
  englishName: string;

  @Expose()
  headquarterAddress: string;

  @Expose()
  description: string;

  @Expose()
  logoUrl: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  deletedAt: Date | null;
}
