import { Module } from '@nestjs/common';
import { ProvisionServiceVoucherService } from './provision_service_voucher.service';
import { ProvisionServiceVoucherController } from './provision_service_voucher.controller';
import { PrismaService } from 'src/prisma.service';
import { VoucherService } from '../voucher/voucher.service';

@Module({
  controllers: [ProvisionServiceVoucherController],
  providers: [ProvisionServiceVoucherService, PrismaService, VoucherService],
})
export class ProvisionServiceVoucherModule {}
