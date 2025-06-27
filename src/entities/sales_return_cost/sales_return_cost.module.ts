import { Module } from '@nestjs/common';
import { SalesReturnCostService } from './sales_return_cost.service';
import { SalesReturnCostController } from './sales_return_cost.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SalesReturnCostController],
  providers: [SalesReturnCostService, PrismaService],
})
export class SalesReturnCostModule {}
