import { Module } from '@nestjs/common';
import { PurchaseVoucherService } from './purchase_voucher.service';
import { PurchaseVoucherController } from './purchase_voucher.controller';
import { PrismaService } from 'src/prisma.service';
import { VoucherService } from '../voucher/voucher.service';

@Module({
  controllers: [PurchaseVoucherController],
  providers: [PurchaseVoucherService, PrismaService, VoucherService],
})
export class PurchaseVoucherModule {}
