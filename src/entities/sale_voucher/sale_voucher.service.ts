import { Injectable } from '@nestjs/common';
import { CreateSaleVoucherDto } from './dto/create-sale_voucher.dto';
import { UpdateSaleVoucherDto } from './dto/update-sale_voucher.dto';

@Injectable()
export class SaleVoucherService {
  create(createSaleVoucherDto: CreateSaleVoucherDto) {
    return 'This action adds a new saleVoucher';
  }

  findAll() {
    return `This action returns all saleVoucher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saleVoucher`;
  }

  update(id: number, updateSaleVoucherDto: UpdateSaleVoucherDto) {
    return `This action updates a #${id} saleVoucher`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleVoucher`;
  }
}
