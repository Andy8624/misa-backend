import { Module } from '@nestjs/common';
import { SaleVoucherItemService } from './sale_voucher_item.service';
import { SaleVoucherItemController } from './sale_voucher_item.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SaleVoucherItemController],
  providers: [SaleVoucherItemService, PrismaService],
})
export class SaleVoucherItemModule {}
