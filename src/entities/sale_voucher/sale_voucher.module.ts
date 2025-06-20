import { Module } from '@nestjs/common';
import { SaleVoucherService } from './sale_voucher.service';
import { SaleVoucherController } from './sale_voucher.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SaleVoucherController],
  providers: [SaleVoucherService, PrismaService],
})
export class SaleVoucherModule {}
