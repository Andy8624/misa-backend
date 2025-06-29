import { Module } from '@nestjs/common';
import { SalesReturnService } from './sales_return.service';
import { SalesReturnController } from './sales_return.controller';
import { PrismaService } from 'src/prisma.service';
import { VoucherService } from '../voucher/voucher.service';
import { FileService } from '../file/file.service';

@Module({
  controllers: [SalesReturnController],
  providers: [SalesReturnService, PrismaService, VoucherService, FileService],
})
export class SalesReturnModule {}
