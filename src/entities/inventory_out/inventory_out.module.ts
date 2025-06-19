import { Module } from '@nestjs/common';
import { InventoryOutService } from './inventory_out.service';
import { InventoryOutController } from './inventory_out.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [InventoryOutController],
  providers: [InventoryOutService, PrismaService],
})
export class InventoryOutModule {}
