import { PartialType } from '@nestjs/swagger';
import { CreateCashPaymentDto } from './create-cash-payment.dto';

export class UpdateCashPaymentDto extends PartialType(CreateCashPaymentDto) {}
