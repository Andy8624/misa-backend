import { Module } from '@nestjs/common';
import { DepositReceipService } from './deposit_receip.service';
import { DepositReceipController } from './deposit_receip.controller';
import { PrismaService } from 'src/prisma.service';
import { VoucherService } from '../voucher/voucher.service';

@Module({
  controllers: [DepositReceipController],
  providers: [DepositReceipService, PrismaService, VoucherService],
})
export class DepositReceipModule {}
