import { Module } from '@nestjs/common';
import { PurchaseVoucherItemService } from './purchase_voucher_item.service';
import { PurchaseVoucherItemController } from './purchase_voucher_item.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PurchaseVoucherItemController],
  providers: [PurchaseVoucherItemService, PrismaService],
})
export class PurchaseVoucherItemModule {}
