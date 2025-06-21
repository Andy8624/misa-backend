import { PartialType } from '@nestjs/swagger';
import { CreateDepositReceipDto } from './create-deposit_receip.dto';

export class UpdateDepositReceipDto extends PartialType(
  CreateDepositReceipDto,
) {}
