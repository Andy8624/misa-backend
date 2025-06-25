import { Module } from '@nestjs/common';
import { AssetIncrementService } from './asset_increment.service';
import { AssetIncrementController } from './asset_increment.controller';
import { PrismaService } from 'src/prisma.service';
import { VoucherService } from '../voucher/voucher.service';

@Module({
  controllers: [AssetIncrementController],
  providers: [AssetIncrementService, PrismaService, VoucherService],
})
export class AssetIncrementModule {}
