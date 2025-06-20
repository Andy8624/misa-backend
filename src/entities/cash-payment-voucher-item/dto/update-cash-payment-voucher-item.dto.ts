import { PartialType } from '@nestjs/swagger';
import { CreateCashPaymentVoucherItemDto } from './create-cash-payment-voucher-item.dto';

export class UpdateCashPaymentVoucherItemDto extends PartialType(
  CreateCashPaymentVoucherItemDto,
) {}
