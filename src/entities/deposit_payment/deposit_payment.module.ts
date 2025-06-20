import { Module } from '@nestjs/common';
import { DepositPaymentService } from './deposit_payment.service';
import { DepositPaymentController } from './deposit_payment.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DepositPaymentController],
  providers: [DepositPaymentService, PrismaService],
})
export class DepositPaymentModule {}
