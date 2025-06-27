import { PartialType } from '@nestjs/swagger';
import { CreateSaleDiscountVoucherDto } from './create-sale_discount_voucher.dto';

export class UpdateSaleDiscountVoucherDto extends PartialType(CreateSaleDiscountVoucherDto) {}
