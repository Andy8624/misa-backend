import { PartialType } from '@nestjs/swagger';
import { CreatePaymentReceipVoucherItemDto } from './create-payment_receip_voucher_item.dto';

export class UpdatePaymentReceipVoucherItemDto extends PartialType(CreatePaymentReceipVoucherItemDto) {}
