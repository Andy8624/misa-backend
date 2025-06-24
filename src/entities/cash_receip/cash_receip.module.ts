import { Module } from '@nestjs/common';
import { CashReceipService } from './cash_receip.service';
import { CashReceipController } from './cash_receip.controller';
import { PrismaService } from 'src/prisma.service';
import { VoucherService } from '../voucher/voucher.service';

@Module({
  controllers: [CashReceipController],
  providers: [CashReceipService, PrismaService, VoucherService],
})
export class CashReceipModule {}
