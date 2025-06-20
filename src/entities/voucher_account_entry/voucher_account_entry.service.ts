import { Injectable } from '@nestjs/common';
import { CreateVoucherAccountEntryDto } from './dto/create-voucher_account_entry.dto';
import { UpdateVoucherAccountEntryDto } from './dto/update-voucher_account_entry.dto';

@Injectable()
export class VoucherAccountEntryService {
  create(createVoucherAccountEntryDto: CreateVoucherAccountEntryDto) {
    return 'This action adds a new voucherAccountEntry';
  }

  findAll() {
    return `This action returns all voucherAccountEntry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} voucherAccountEntry`;
  }

  update(id: number, updateVoucherAccountEntryDto: UpdateVoucherAccountEntryDto) {
    return `This action updates a #${id} voucherAccountEntry`;
  }

  remove(id: number) {
    return `This action removes a #${id} voucherAccountEntry`;
  }
}
