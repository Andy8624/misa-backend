import { PartialType } from '@nestjs/mapped-types';
import { CreateGoodsAndServicesGroupDto } from './create-goods_and_services_group.dto';

export class UpdateGoodsAndServicesGroupDto extends PartialType(
  CreateGoodsAndServicesGroupDto,
) {}
