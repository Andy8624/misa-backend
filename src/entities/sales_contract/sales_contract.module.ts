import { Module } from '@nestjs/common';
import { SalesContractService } from './sales_contract.service';
import { SalesContractController } from './sales_contract.controller';
import { PrismaService } from 'src/prisma.service';
import { VoucherService } from '../voucher/voucher.service';

@Module({
  controllers: [SalesContractController],
  providers: [SalesContractService, PrismaService, VoucherService],
})
export class SalesContractModule {}
