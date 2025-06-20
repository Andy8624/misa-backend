import { Injectable } from '@nestjs/common';
import { CreateServicePurchaseVoucherItemDto } from './dto/create-service_purchase_voucher_item.dto';
import { UpdateServicePurchaseVoucherItemDto } from './dto/update-service_purchase_voucher_item.dto';

@Injectable()
export class ServicePurchaseVoucherItemService {
  create(createServicePurchaseVoucherItemDto: CreateServicePurchaseVoucherItemDto) {
    return 'This action adds a new servicePurchaseVoucherItem';
  }

  findAll() {
    return `This action returns all servicePurchaseVoucherItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} servicePurchaseVoucherItem`;
  }

  update(id: number, updateServicePurchaseVoucherItemDto: UpdateServicePurchaseVoucherItemDto) {
    return `This action updates a #${id} servicePurchaseVoucherItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} servicePurchaseVoucherItem`;
  }
}
