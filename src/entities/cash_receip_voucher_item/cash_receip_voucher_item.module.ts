import { Module } from '@nestjs/common';
import { CashReceipVoucherItemService } from './cash_receip_voucher_item.service';
import { CashReceipVoucherItemController } from './cash_receip_voucher_item.controller';

@Module({
  controllers: [CashReceipVoucherItemController],
  providers: [CashReceipVoucherItemService],
})
export class CashReceipVoucherItemModule {}
