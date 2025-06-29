import { Module } from '@nestjs/common';
import { CashPaymentService } from './cash-payment.service';
import { CashPaymentController } from './cash-payment.controller';
import { PrismaService } from 'src/prisma.service';
import { VoucherService } from '../voucher/voucher.service';
import { FileService } from '../file/file.service';

@Module({
  controllers: [CashPaymentController],
  providers: [CashPaymentService, PrismaService, VoucherService, FileService],
})
export class CashPaymentModule {}
