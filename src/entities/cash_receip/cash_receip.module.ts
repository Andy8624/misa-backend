import { Module } from '@nestjs/common';
import { CashReceipService } from './cash_receip.service';
import { CashReceipController } from './cash_receip.controller';
import { PrismaService } from 'src/prisma.service';
import { VoucherService } from '../voucher/voucher.service';
import { FileService } from '../file/file.service';

@Module({
  controllers: [CashReceipController],
  providers: [CashReceipService, PrismaService, VoucherService, FileService],
})
export class CashReceipModule {}
