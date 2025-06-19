import { Injectable } from '@nestjs/common';
import { CreatePaymentReceipDto } from './dto/create-payment_receip.dto';
import { UpdatePaymentReceipDto } from './dto/update-payment_receip.dto';

@Injectable()
export class PaymentReceipService {
  create(createPaymentReceipDto: CreatePaymentReceipDto) {
    return 'This action adds a new paymentReceip';
  }

  findAll() {
    return `This action returns all paymentReceip`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentReceip`;
  }

  update(id: number, updatePaymentReceipDto: UpdatePaymentReceipDto) {
    return `This action updates a #${id} paymentReceip`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentReceip`;
  }
}
