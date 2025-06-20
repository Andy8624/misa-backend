import { Module } from '@nestjs/common';
import { PaymentTermService } from './payment_term.service';
import { PaymentTermController } from './payment_term.controller';

@Module({
  controllers: [PaymentTermController],
  providers: [PaymentTermService],
})
export class PaymentTermModule {}
