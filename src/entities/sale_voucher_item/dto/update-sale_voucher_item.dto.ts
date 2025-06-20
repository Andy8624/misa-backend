import { PartialType } from '@nestjs/swagger';
import { CreateSaleVoucherItemDto } from './create-sale_voucher_item.dto';

export class UpdateSaleVoucherItemDto extends PartialType(CreateSaleVoucherItemDto) {}
