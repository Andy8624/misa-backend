import { Module } from '@nestjs/common';
import { AssetComponentService } from './asset_component.service';
import { AssetComponentController } from './asset_component.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AssetComponentController],
  providers: [AssetComponentService, PrismaService],
})
export class AssetComponentModule {}
