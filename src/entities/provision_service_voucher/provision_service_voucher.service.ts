import { Injectable } from '@nestjs/common';
import { CreateProvisionServiceVoucherDto } from './dto/create-provision_service_voucher.dto';
import { UpdateProvisionServiceVoucherDto } from './dto/update-provision_service_voucher.dto';

@Injectable()
export class ProvisionServiceVoucherService {
  create(createProvisionServiceVoucherDto: CreateProvisionServiceVoucherDto) {
    return 'This action adds a new provisionServiceVoucher';
  }

  findAll() {
    return `This action returns all provisionServiceVoucher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} provisionServiceVoucher`;
  }

  update(id: number, updateProvisionServiceVoucherDto: UpdateProvisionServiceVoucherDto) {
    return `This action updates a #${id} provisionServiceVoucher`;
  }

  remove(id: number) {
    return `This action removes a #${id} provisionServiceVoucher`;
  }
}
