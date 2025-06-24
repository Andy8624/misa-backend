import { Module } from '@nestjs/common';
import { AssetTransferService } from './asset_transfer.service';
import { AssetTransferController } from './asset_transfer.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AssetTransferController],
  providers: [AssetTransferService, PrismaService],
})
export class AssetTransferModule {}
