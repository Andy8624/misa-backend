import { Module } from '@nestjs/common';
import { AssetWriteOffService } from './asset_write_off.service';
import { AssetWriteOffController } from './asset_write_off.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AssetWriteOffController],
  providers: [AssetWriteOffService, PrismaService],
})
export class AssetWriteOffModule {}
