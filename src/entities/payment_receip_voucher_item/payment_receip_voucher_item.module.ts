import { Module } from '@nestjs/common';
import { PaymentReceipVoucherItemService } from './payment_receip_voucher_item.service';
import { PaymentReceipVoucherItemController } from './payment_receip_voucher_item.controller';

@Module({
  controllers: [PaymentReceipVoucherItemController],
  providers: [PaymentReceipVoucherItemService],
})
export class PaymentReceipVoucherItemModule {}
