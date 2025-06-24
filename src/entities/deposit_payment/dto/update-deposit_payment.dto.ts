import { PartialType } from '@nestjs/swagger';
import { CreateDepositPaymentDto } from './create-deposit_payment.dto';

export class UpdateDepositPaymentDto extends PartialType(
  CreateDepositPaymentDto,
) {}
