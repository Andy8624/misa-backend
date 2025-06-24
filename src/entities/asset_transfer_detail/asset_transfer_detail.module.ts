import { Module } from '@nestjs/common';
import { AssetTransferDetailService } from './asset_transfer_detail.service';
import { AssetTransferDetailController } from './asset_transfer_detail.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AssetTransferDetailController],
  providers: [AssetTransferDetailService, PrismaService],
})
export class AssetTransferDetailModule {}
