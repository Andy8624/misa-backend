import { Module } from '@nestjs/common';
import { AssetRevaluationPostingService } from './asset_revaluation_posting.service';
import { AssetRevaluationPostingController } from './asset_revaluation_posting.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AssetRevaluationPostingController],
  providers: [AssetRevaluationPostingService, PrismaService],
})
export class AssetRevaluationPostingModule {}
