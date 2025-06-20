import { Injectable } from '@nestjs/common';
import { CreatePurchaseVoucherItemDto } from './dto/create-purchase_voucher_item.dto';
import { UpdatePurchaseVoucherItemDto } from './dto/update-purchase_voucher_item.dto';

@Injectable()
export class PurchaseVoucherItemService {
  create(createPurchaseVoucherItemDto: CreatePurchaseVoucherItemDto) {
    return 'This action adds a new purchaseVoucherItem';
  }

  findAll() {
    return `This action returns all purchaseVoucherItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseVoucherItem`;
  }

  update(id: number, updatePurchaseVoucherItemDto: UpdatePurchaseVoucherItemDto) {
    return `This action updates a #${id} purchaseVoucherItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseVoucherItem`;
  }
}
