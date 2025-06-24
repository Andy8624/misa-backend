import { Module } from '@nestjs/common';
import { AssetWriteOffAssetService } from './asset_write_off_asset.service';
import { AssetWriteOffAssetController } from './asset_write_off_asset.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AssetWriteOffAssetController],
  providers: [AssetWriteOffAssetService, PrismaService],
})
export class AssetWriteOffAssetModule {}
