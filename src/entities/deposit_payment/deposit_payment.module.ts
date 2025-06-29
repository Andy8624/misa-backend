import { Module } from '@nestjs/common';
import { DepositPaymentService } from './deposit_payment.service';
import { DepositPaymentController } from './deposit_payment.controller';
import { PrismaService } from 'src/prisma.service';
import { VoucherService } from '../voucher/voucher.service';
import { FileService } from '../file/file.service';

@Module({
  controllers: [DepositPaymentController],
  providers: [
    DepositPaymentService,
    PrismaService,
    VoucherService,
    FileService,
  ],
})
export class DepositPaymentModule {}
