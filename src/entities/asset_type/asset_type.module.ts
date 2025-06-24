import { Module } from '@nestjs/common';
import { AssetTypeService } from './asset_type.service';
import { AssetTypeController } from './asset_type.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AssetTypeController],
  providers: [AssetTypeService, PrismaService],
})
export class AssetTypeModule {}
