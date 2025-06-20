import { Module } from '@nestjs/common';
import { CashPaymentVoucherItemService } from './cash-payment-voucher-item.service';
import { CashPaymentVoucherItemController } from './cash-payment-voucher-item.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CashPaymentVoucherItemController],
  providers: [CashPaymentVoucherItemService, PrismaService],
})
export class CashPaymentVoucherItemModule {}
