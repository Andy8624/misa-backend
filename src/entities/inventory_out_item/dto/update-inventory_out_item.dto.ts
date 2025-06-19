import { PartialType } from '@nestjs/swagger';
import { CreateInventoryOutItemDto } from './create-inventory_out_item.dto';

export class UpdateInventoryOutItemDto extends PartialType(CreateInventoryOutItemDto) {}
