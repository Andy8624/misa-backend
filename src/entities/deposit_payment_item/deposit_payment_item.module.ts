import { Module } from '@nestjs/common';
import { DepositPaymentItemService } from './deposit_payment_item.service';
import { DepositPaymentItemController } from './deposit_payment_item.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DepositPaymentItemController],
  providers: [DepositPaymentItemService, PrismaService],
})
export class DepositPaymentItemModule {}
