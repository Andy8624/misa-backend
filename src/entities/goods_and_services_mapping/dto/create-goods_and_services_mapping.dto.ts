import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateGoodsAndServicesMappingDto {
  @Expose()
  @IsNotEmpty({ message: 'Goods and services ID cannot be empty' })
  goodsAndServicesId: string;

  @Expose()
  @IsNotEmpty({ message: 'Goods and services group ID cannot be empty' })
  goodsAndServicesGroupId: string;
}
