import { Module } from '@nestjs/common';
import { VoucherAccountEntryService } from './voucher_account_entry.service';
import { VoucherAccountEntryController } from './voucher_account_entry.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VoucherAccountEntryController],
  providers: [VoucherAccountEntryService, PrismaService],
})
export class VoucherAccountEntryModule {}
