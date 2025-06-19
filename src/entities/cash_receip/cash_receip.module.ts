import { Module } from '@nestjs/common';
import { CashReceipService } from './cash_receip.service';
import { CashReceipController } from './cash_receip.controller';

@Module({
  controllers: [CashReceipController],
  providers: [CashReceipService],
})
export class CashReceipModule {}
