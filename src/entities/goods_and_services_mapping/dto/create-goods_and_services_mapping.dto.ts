import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateGoodsAndServicesMappingDto {
  @Expose()
  @IsNotEmpty({ message: 'ID hàng hóa dịch vụ không được để trống' })
  goodsAndServicesId: string;

  @Expose()
  @IsNotEmpty({ message: 'ID nhóm hàng hóa dịch vụ không được để trống' })
  goodsAndServicesGroupId: string;
}
