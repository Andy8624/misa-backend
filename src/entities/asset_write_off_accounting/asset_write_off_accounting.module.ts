import { Module } from '@nestjs/common';
import { AssetWriteOffAccountingService } from './asset_write_off_accounting.service';
import { AssetWriteOffAccountingController } from './asset_write_off_accounting.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AssetWriteOffAccountingController],
  providers: [AssetWriteOffAccountingService, PrismaService],
})
export class AssetWriteOffAccountingModule {}
