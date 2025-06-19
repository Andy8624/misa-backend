import { PartialType } from '@nestjs/swagger';
import { CreateCashReceipDto } from './create-cash_receip.dto';

export class UpdateCashReceipDto extends PartialType(CreateCashReceipDto) {}
