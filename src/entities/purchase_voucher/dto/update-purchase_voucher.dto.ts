import { PartialType } from '@nestjs/swagger';
import { CreatePurchaseVoucherDto } from './create-purchase_voucher.dto';

export class UpdatePurchaseVoucherDto extends PartialType(CreatePurchaseVoucherDto) {}
