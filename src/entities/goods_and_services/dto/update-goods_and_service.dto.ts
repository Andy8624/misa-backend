import { PartialType } from '@nestjs/swagger';
import { CreateGoodsAndServiceDto } from './create-goods_and_service.dto';

export class UpdateGoodsAndServiceDto extends PartialType(CreateGoodsAndServiceDto) {}
