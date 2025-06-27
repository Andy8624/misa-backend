import { Module } from '@nestjs/common';
import { SaleDiscountVoucherService } from './sale_discount_voucher.service';
import { SaleDiscountVoucherController } from './sale_discount_voucher.controller';
import { PrismaService } from 'src/prisma.service';
import { VoucherService } from '../voucher/voucher.service';

@Module({
  controllers: [SaleDiscountVoucherController],
  providers: [SaleDiscountVoucherService, PrismaService, VoucherService],
})
export class SaleDiscountVoucherModule {}
