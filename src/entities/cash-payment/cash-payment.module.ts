import { Module } from '@nestjs/common';
import { CashPaymentService } from './cash-payment.service';
import { CashPaymentController } from './cash-payment.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CashPaymentController],
  providers: [CashPaymentService, PrismaService],
})
export class CashPaymentModule {}
