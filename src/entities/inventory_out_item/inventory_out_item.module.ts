import { Module } from '@nestjs/common';
import { InventoryOutItemService } from './inventory_out_item.service';
import { InventoryOutItemController } from './inventory_out_item.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [InventoryOutItemController],
  providers: [InventoryOutItemService, PrismaService],
})
export class InventoryOutItemModule {}
