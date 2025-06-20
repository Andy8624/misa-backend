import { PartialType } from '@nestjs/swagger';
import { CreateProvisionServiceVoucherItemDto } from './create-provision_service_voucher_item.dto';

export class UpdateProvisionServiceVoucherItemDto extends PartialType(CreateProvisionServiceVoucherItemDto) {}
