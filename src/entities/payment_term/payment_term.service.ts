import { Injectable } from '@nestjs/common';
import { CreatePaymentTermDto } from './dto/create-payment_term.dto';
import { UpdatePaymentTermDto } from './dto/update-payment_term.dto';

@Injectable()
export class PaymentTermService {
  create(createPaymentTermDto: CreatePaymentTermDto) {
    return 'This action adds a new paymentTerm';
  }

  findAll() {
    return `This action returns all paymentTerm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentTerm`;
  }

  update(id: number, updatePaymentTermDto: UpdatePaymentTermDto) {
    return `This action updates a #${id} paymentTerm`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentTerm`;
  }
}
