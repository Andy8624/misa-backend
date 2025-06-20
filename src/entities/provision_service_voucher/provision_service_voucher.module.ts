import { Module } from '@nestjs/common';
import { ProvisionServiceVoucherService } from './provision_service_voucher.service';
import { ProvisionServiceVoucherController } from './provision_service_voucher.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProvisionServiceVoucherController],
  providers: [ProvisionServiceVoucherService, PrismaService],
})
export class ProvisionServiceVoucherModule {}
