import { Module } from '@nestjs/common';
import { AssetRevaluationService } from './asset_revaluation.service';
import { AssetRevaluationController } from './asset_revaluation.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AssetRevaluationController],
  providers: [AssetRevaluationService, PrismaService],
})
export class AssetRevaluationModule {}
