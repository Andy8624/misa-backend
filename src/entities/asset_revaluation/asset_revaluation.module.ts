import { Module } from '@nestjs/common';
import { AssetRevaluationService } from './asset_revaluation.service';
import { AssetRevaluationController } from './asset_revaluation.controller';
import { PrismaService } from 'src/prisma.service';
import { VoucherService } from '../voucher/voucher.service';
import { FileService } from '../file/file.service';

@Module({
  controllers: [AssetRevaluationController],
  providers: [
    AssetRevaluationService,
    PrismaService,
    VoucherService,
    FileService,
  ],
})
export class AssetRevaluationModule {}
