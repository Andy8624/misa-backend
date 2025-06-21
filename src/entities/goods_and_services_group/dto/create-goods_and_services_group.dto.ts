import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGoodsAndServicesGroupDto {
  @Expose()
  @IsNotEmpty({
    message: 'Goods and services group code cannot be empty',
  })
  code: string;

  @Expose()
  @IsNotEmpty({
    message: 'Goods and services group name cannot be empty',
  })
  name: string;

  @Expose()
  @IsNotEmpty({
    message: 'Goods and services group status cannot be empty',
  })
  status: string;

  @Expose()
  @IsOptional()
  parentGroupId: string;

  @Expose()
  @IsNotEmpty({ message: 'Company ID cannot be empty' })
  customerId: string;
}
