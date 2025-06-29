import { Module } from '@nestjs/common';
import { SalesContractService } from './sales_contract.service';
import { SalesContractController } from './sales_contract.controller';
import { PrismaService } from 'src/prisma.service';
import { VoucherService } from '../voucher/voucher.service';
import { FileService } from '../file/file.service';

@Module({
  controllers: [SalesContractController],
  providers: [SalesContractService, PrismaService, VoucherService, FileService],
})
export class SalesContractModule {}
