import { Module } from '@nestjs/common';
import { PurchaseVoucherService } from './purchase_voucher.service';
import { PurchaseVoucherController } from './purchase_voucher.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PurchaseVoucherController],
  providers: [PurchaseVoucherService, PrismaService],
})
export class PurchaseVoucherModule {}
