import { Module } from '@nestjs/common';
import { GroupOfPurchaseGoodService } from './group_of_purchase_good.service';
import { GroupOfPurchaseGoodController } from './group_of_purchase_good.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [GroupOfPurchaseGoodController],
  providers: [GroupOfPurchaseGoodService, PrismaService],
})
export class GroupOfPurchaseGoodModule {}
