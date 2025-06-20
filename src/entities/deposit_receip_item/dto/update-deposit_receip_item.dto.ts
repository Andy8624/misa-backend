import { PartialType } from '@nestjs/swagger';
import { CreateDepositReceipItemDto } from './create-deposit_receip_item.dto';

export class UpdateDepositReceipItemDto extends PartialType(CreateDepositReceipItemDto) {}
