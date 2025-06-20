import { Module } from '@nestjs/common';
import { ServicePurchaseVoucherItemService } from './service_purchase_voucher_item.service';
import { ServicePurchaseVoucherItemController } from './service_purchase_voucher_item.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ServicePurchaseVoucherItemController],
  providers: [ServicePurchaseVoucherItemService, PrismaService],
})
export class ServicePurchaseVoucherItemModule {}
