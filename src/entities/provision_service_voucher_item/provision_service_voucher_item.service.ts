import { Injectable } from '@nestjs/common';
import { CreateProvisionServiceVoucherItemDto } from './dto/create-provision_service_voucher_item.dto';
import { UpdateProvisionServiceVoucherItemDto } from './dto/update-provision_service_voucher_item.dto';

@Injectable()
export class ProvisionServiceVoucherItemService {
  create(createProvisionServiceVoucherItemDto: CreateProvisionServiceVoucherItemDto) {
    return 'This action adds a new provisionServiceVoucherItem';
  }

  findAll() {
    return `This action returns all provisionServiceVoucherItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} provisionServiceVoucherItem`;
  }

  update(id: number, updateProvisionServiceVoucherItemDto: UpdateProvisionServiceVoucherItemDto) {
    return `This action updates a #${id} provisionServiceVoucherItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} provisionServiceVoucherItem`;
  }
}
