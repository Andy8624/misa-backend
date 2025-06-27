import { Module } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { QuotationController } from './quotation.controller';
import { PrismaService } from 'src/prisma.service';
import { VoucherService } from '../voucher/voucher.service';

@Module({
  controllers: [QuotationController],
  providers: [QuotationService, PrismaService, VoucherService],
})
export class QuotationModule {}
