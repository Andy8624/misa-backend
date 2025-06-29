import { Module } from '@nestjs/common';
import { AssetTransferService } from './asset_transfer.service';
import { AssetTransferController } from './asset_transfer.controller';
import { PrismaService } from 'src/prisma.service';
import { VoucherService } from '../voucher/voucher.service';
import { FileService } from '../file/file.service';

@Module({
  controllers: [AssetTransferController],
  providers: [AssetTransferService, PrismaService, VoucherService, FileService],
})
export class AssetTransferModule {}
