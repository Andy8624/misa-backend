import { PartialType } from '@nestjs/swagger';
import { CreateProvisionServiceVoucherDto } from './create-provision_service_voucher.dto';

export class UpdateProvisionServiceVoucherDto extends PartialType(CreateProvisionServiceVoucherDto) {}
