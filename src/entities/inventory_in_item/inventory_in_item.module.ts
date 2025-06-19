import { Module } from '@nestjs/common';
import { InventoryInItemService } from './inventory_in_item.service';
import { InventoryInItemController } from './inventory_in_item.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [InventoryInItemController],
  providers: [InventoryInItemService, PrismaService],
})
export class InventoryInItemModule {}
