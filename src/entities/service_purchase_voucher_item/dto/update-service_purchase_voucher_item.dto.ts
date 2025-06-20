import { PartialType } from '@nestjs/swagger';
import { CreateServicePurchaseVoucherItemDto } from './create-service_purchase_voucher_item.dto';

export class UpdateServicePurchaseVoucherItemDto extends PartialType(
  CreateServicePurchaseVoucherItemDto,
) {}
