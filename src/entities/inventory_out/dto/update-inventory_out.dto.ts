import { PartialType } from '@nestjs/swagger';
import { CreateInventoryOutDto } from './create-inventory_out.dto';

export class UpdateInventoryOutDto extends PartialType(CreateInventoryOutDto) {}
