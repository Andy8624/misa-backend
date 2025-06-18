import { Expose, Type } from 'class-transformer';
import { ResponseGoodsAndServicesGroupDto } from 'src/entities/goods_and_services_group/dto/response-goods_and_services_group.dto';

export class ResponseGoodsAndServicesMappingDto {
  @Expose()
  id: string;

  @Expose()
  goodsAndServicesId: string;

  @Expose()
  goodsAndServicesGroupId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => ResponseGoodsAndServicesGroupDto)
  goodsAndServicesGroup?: ResponseGoodsAndServicesGroupDto;
}
