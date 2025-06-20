import { PartialType } from '@nestjs/swagger';
import { CreateVoucherAccountEntryDto } from './create-voucher_account_entry.dto';

export class UpdateVoucherAccountEntryDto extends PartialType(CreateVoucherAccountEntryDto) {}
