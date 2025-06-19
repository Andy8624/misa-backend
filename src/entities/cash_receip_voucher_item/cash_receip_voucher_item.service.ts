import { Injectable } from '@nestjs/common';
import { CreateCashReceipVoucherItemDto } from './dto/create-cash_receip_voucher_item.dto';
import { UpdateCashReceipVoucherItemDto } from './dto/update-cash_receip_voucher_item.dto';

@Injectable()
export class CashReceipVoucherItemService {
  create(createCashReceipVoucherItemDto: CreateCashReceipVoucherItemDto) {
    return 'This action adds a new cashReceipVoucherItem';
  }

  findAll() {
    return `This action returns all cashReceipVoucherItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cashReceipVoucherItem`;
  }

  update(id: number, updateCashReceipVoucherItemDto: UpdateCashReceipVoucherItemDto) {
    return `This action updates a #${id} cashReceipVoucherItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} cashReceipVoucherItem`;
  }
}
