import { Module } from '@nestjs/common';
import { AssetRevaluationDetailService } from './asset_revaluation_detail.service';
import { AssetRevaluationDetailController } from './asset_revaluation_detail.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AssetRevaluationDetailController],
  providers: [AssetRevaluationDetailService, PrismaService],
})
export class AssetRevaluationDetailModule {}
