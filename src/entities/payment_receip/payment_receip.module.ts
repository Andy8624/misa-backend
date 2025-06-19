import { Module } from '@nestjs/common';
import { PaymentReceipService } from './payment_receip.service';
import { PaymentReceipController } from './payment_receip.controller';

@Module({
  controllers: [PaymentReceipController],
  providers: [PaymentReceipService],
})
export class PaymentReceipModule {}
