import { Injectable } from '@nestjs/common';
import { CreatePaymentReceipVoucherItemDto } from './dto/create-payment_receip_voucher_item.dto';
import { UpdatePaymentReceipVoucherItemDto } from './dto/update-payment_receip_voucher_item.dto';

@Injectable()
export class PaymentReceipVoucherItemService {
  create(createPaymentReceipVoucherItemDto: CreatePaymentReceipVoucherItemDto) {
    return 'This action adds a new paymentReceipVoucherItem';
  }

  findAll() {
    return `This action returns all paymentReceipVoucherItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentReceipVoucherItem`;
  }

  update(id: number, updatePaymentReceipVoucherItemDto: UpdatePaymentReceipVoucherItemDto) {
    return `This action updates a #${id} paymentReceipVoucherItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentReceipVoucherItem`;
  }
}
