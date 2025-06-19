import { Module } from '@nestjs/common';
import { ProductionOrderService } from './production_order.service';
import { ProductionOrderController } from './production_order.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProductionOrderController],
  providers: [ProductionOrderService, PrismaService],
})
export class ProductionOrderModule {}
