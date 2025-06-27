import { Module } from '@nestjs/common';
import { PurchaseOrderService } from './purchase_order.service';
import { PurchaseOrderController } from './purchase_order.controller';
import { PrismaService } from 'src/prisma.service';
import { VoucherService } from '../voucher/voucher.service';

@Module({
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService, PrismaService, VoucherService],
})
export class PurchaseOrderModule {}
