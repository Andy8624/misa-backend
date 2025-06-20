import { Module } from '@nestjs/common';
import { CashReceipVoucherItemService } from './cash_receip_voucher_item.service';
import { CashReceipVoucherItemController } from './cash_receip_voucher_item.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CashReceipVoucherItemController],
  providers: [CashReceipVoucherItemService, PrismaService],
})
export class CashReceipVoucherItemModule {}
