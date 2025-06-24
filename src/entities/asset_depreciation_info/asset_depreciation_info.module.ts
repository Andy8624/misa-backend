import { Module } from '@nestjs/common';
import { AssetDepreciationInfoService } from './asset_depreciation_info.service';
import { AssetDepreciationInfoController } from './asset_depreciation_info.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AssetDepreciationInfoController],
  providers: [AssetDepreciationInfoService, PrismaService],
})
export class AssetDepreciationInfoModule {}
