import { PartialType } from '@nestjs/swagger';
import { CreatePaymentReceipDto } from './create-payment_receip.dto';

export class UpdatePaymentReceipDto extends PartialType(CreatePaymentReceipDto) {}
