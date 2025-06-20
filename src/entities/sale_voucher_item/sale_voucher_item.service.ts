import { Injectable } from '@nestjs/common';
import { CreateSaleVoucherItemDto } from './dto/create-sale_voucher_item.dto';
import { UpdateSaleVoucherItemDto } from './dto/update-sale_voucher_item.dto';

@Injectable()
export class SaleVoucherItemService {
  create(createSaleVoucherItemDto: CreateSaleVoucherItemDto) {
    return 'This action adds a new saleVoucherItem';
  }

  findAll() {
    return `This action returns all saleVoucherItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saleVoucherItem`;
  }

  update(id: number, updateSaleVoucherItemDto: UpdateSaleVoucherItemDto) {
    return `This action updates a #${id} saleVoucherItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleVoucherItem`;
  }
}
