import { Injectable } from '@nestjs/common';
import { CreateCashReceipDto } from './dto/create-cash_receip.dto';
import { UpdateCashReceipDto } from './dto/update-cash_receip.dto';

@Injectable()
export class CashReceipService {
  create(createCashReceipDto: CreateCashReceipDto) {
    return 'This action adds a new cashReceip';
  }

  findAll() {
    return `This action returns all cashReceip`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cashReceip`;
  }

  update(id: number, updateCashReceipDto: UpdateCashReceipDto) {
    return `This action updates a #${id} cashReceip`;
  }

  remove(id: number) {
    return `This action removes a #${id} cashReceip`;
  }
}
