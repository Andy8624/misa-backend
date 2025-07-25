import { Module } from '@nestjs/common';
import { ServicePurchaseVoucherService } from './service_purchase_voucher.service';
import { ServicePurchaseVoucherController } from './service_purchase_voucher.controller';
import { PrismaService } from 'src/prisma.service';
import { VoucherService } from '../voucher/voucher.service';

@Module({
  controllers: [ServicePurchaseVoucherController],
  providers: [ServicePurchaseVoucherService, PrismaService, VoucherService],
})
export class ServicePurchaseVoucherModule {}
