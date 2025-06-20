import { Module } from '@nestjs/common';
import { DepositReceipItemService } from './deposit_receip_item.service';
import { DepositReceipItemController } from './deposit_receip_item.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DepositReceipItemController],
  providers: [DepositReceipItemService, PrismaService],
})
export class DepositReceipItemModule {}
