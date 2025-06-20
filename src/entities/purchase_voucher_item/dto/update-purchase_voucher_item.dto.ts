import { PartialType } from '@nestjs/swagger';
import { CreatePurchaseVoucherItemDto } from './create-purchase_voucher_item.dto';

export class UpdatePurchaseVoucherItemDto extends PartialType(CreatePurchaseVoucherItemDto) {}
