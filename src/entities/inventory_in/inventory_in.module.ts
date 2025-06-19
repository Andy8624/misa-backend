import { Module } from '@nestjs/common';
import { InventoryInService } from './inventory_in.service';
import { InventoryInController } from './inventory_in.controller';
import { PrismaService } from 'src/prisma.service';
import { FileService } from '../file/file.service';

@Module({
  controllers: [InventoryInController],
  providers: [InventoryInService, PrismaService, FileService],
})
export class InventoryInModule {}
