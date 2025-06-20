import { Module } from '@nestjs/common';
import { ProvisionServiceVoucherItemService } from './provision_service_voucher_item.service';
import { ProvisionServiceVoucherItemController } from './provision_service_voucher_item.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProvisionServiceVoucherItemController],
  providers: [ProvisionServiceVoucherItemService, PrismaService],
})
export class ProvisionServiceVoucherItemModule {}
