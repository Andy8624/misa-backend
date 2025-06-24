import { Module } from '@nestjs/common';
import { AssetAllocationService } from './asset_allocation.service';
import { AssetAllocationController } from './asset_allocation.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AssetAllocationController],
  providers: [AssetAllocationService, PrismaService],
})
export class AssetAllocationModule {}
