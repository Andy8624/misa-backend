import { PartialType } from '@nestjs/swagger';
import { CreateDepositPaymentItemDto } from './create-deposit_payment_item.dto';

export class UpdateDepositPaymentItemDto extends PartialType(CreateDepositPaymentItemDto) {}
