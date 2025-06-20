import { PartialType } from '@nestjs/swagger';
import { CreatePaymentTermDto } from './create-payment_term.dto';

export class UpdatePaymentTermDto extends PartialType(CreatePaymentTermDto) {}
