import { Module } from '@nestjs/common';
import { AssetAccessoryService } from './asset_accessory.service';
import { AssetAccessoryController } from './asset_accessory.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AssetAccessoryController],
  providers: [AssetAccessoryService, PrismaService],
})
export class AssetAccessoryModule {}
