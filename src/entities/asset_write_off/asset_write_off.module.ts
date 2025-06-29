import { Module } from '@nestjs/common';
import { AssetWriteOffService } from './asset_write_off.service';
import { AssetWriteOffController } from './asset_write_off.controller';
import { PrismaService } from 'src/prisma.service';
import { VoucherService } from '../voucher/voucher.service';
import { FileService } from '../file/file.service';

@Module({
  controllers: [AssetWriteOffController],
  providers: [AssetWriteOffService, PrismaService, VoucherService, FileService],
})
export class AssetWriteOffModule {}
