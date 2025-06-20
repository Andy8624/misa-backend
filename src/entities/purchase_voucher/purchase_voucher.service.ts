import { Injectable } from '@nestjs/common';
import { CreatePurchaseVoucherDto } from './dto/create-purchase_voucher.dto';
import { UpdatePurchaseVoucherDto } from './dto/update-purchase_voucher.dto';

@Injectable()
export class PurchaseVoucherService {
  create(createPurchaseVoucherDto: CreatePurchaseVoucherDto) {
    return 'This action adds a new purchaseVoucher';
  }

  findAll() {
    return `This action returns all purchaseVoucher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseVoucher`;
  }

  update(id: number, updatePurchaseVoucherDto: UpdatePurchaseVoucherDto) {
    return `This action updates a #${id} purchaseVoucher`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseVoucher`;
  }
}
