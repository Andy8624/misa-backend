import { PartialType } from '@nestjs/swagger';
import { CreateGoodsAndServicesMappingDto } from './create-goods_and_services_mapping.dto';

export class UpdateGoodsAndServicesMappingDto extends PartialType(CreateGoodsAndServicesMappingDto) {}
