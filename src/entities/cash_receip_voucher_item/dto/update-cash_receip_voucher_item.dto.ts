import { PartialType } from '@nestjs/swagger';
import { CreateCashReceipVoucherItemDto } from './create-cash_receip_voucher_item.dto';

export class UpdateCashReceipVoucherItemDto extends PartialType(
  CreateCashReceipVoucherItemDto,
) {}
