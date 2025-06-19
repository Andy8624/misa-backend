import { PartialType } from '@nestjs/swagger';
import { CreateInventoryInDto } from './create-inventory_in.dto';

export class UpdateInventoryInDto extends PartialType(CreateInventoryInDto) {}
