import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateProductionOrderDto {
  @Expose()
  @IsOptional()
  date: Date;

  @Expose()
  @IsOptional()
  orderNo: number;

  @Expose()
  @IsOptional()
  description: string;
}
