import { PartialType } from '@nestjs/swagger';
import { CreateServicePurchaseVoucherDto } from './create-service_purchase_voucher.dto';

export class UpdateServicePurchaseVoucherDto extends PartialType(CreateServicePurchaseVoucherDto) {}
