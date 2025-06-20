import { Module } from '@nestjs/common';
import { CashReceipService } from './cash_receip.service';
import { CashReceipController } from './cash_receip.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CashReceipController],
  providers: [CashReceipService, PrismaService],
})
export class CashReceipModule {}
