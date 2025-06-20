import { Injectable } from '@nestjs/common';
import { CreateServicePurchaseVoucherDto } from './dto/create-service_purchase_voucher.dto';
import { UpdateServicePurchaseVoucherDto } from './dto/update-service_purchase_voucher.dto';

@Injectable()
export class ServicePurchaseVoucherService {
  create(createServicePurchaseVoucherDto: CreateServicePurchaseVoucherDto) {
    return 'This action adds a new servicePurchaseVoucher';
  }

  findAll() {
    return `This action returns all servicePurchaseVoucher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} servicePurchaseVoucher`;
  }

  update(id: number, updateServicePurchaseVoucherDto: UpdateServicePurchaseVoucherDto) {
    return `This action updates a #${id} servicePurchaseVoucher`;
  }

  remove(id: number) {
    return `This action removes a #${id} servicePurchaseVoucher`;
  }
}
