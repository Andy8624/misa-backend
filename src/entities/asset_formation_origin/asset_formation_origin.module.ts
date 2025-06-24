import { Module } from '@nestjs/common';
import { AssetFormationOriginService } from './asset_formation_origin.service';
import { AssetFormationOriginController } from './asset_formation_origin.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AssetFormationOriginController],
  providers: [AssetFormationOriginService, PrismaService],
})
export class AssetFormationOriginModule {}
