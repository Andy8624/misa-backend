import { Module } from '@nestjs/common';
import { SaleVoucherService } from './sale_voucher.service';
import { SaleVoucherController } from './sale_voucher.controller';
import { PrismaService } from 'src/prisma.service';
import { VoucherService } from '../voucher/voucher.service';
import { FileService } from '../file/file.service';

@Module({
  controllers: [SaleVoucherController],
  providers: [SaleVoucherService, PrismaService, VoucherService, FileService],
})
export class SaleVoucherModule {}
