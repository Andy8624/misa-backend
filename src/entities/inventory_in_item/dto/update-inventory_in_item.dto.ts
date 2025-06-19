import { PartialType } from '@nestjs/swagger';
import { CreateInventoryInItemDto } from './create-inventory_in_item.dto';

export class UpdateInventoryInItemDto extends PartialType(CreateInventoryInItemDto) {}
