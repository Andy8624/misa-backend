import { Module } from '@nestjs/common';
import { VatTaxService } from './vat_tax.service';
import { VatTaxController } from './vat_tax.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VatTaxController],
  providers: [VatTaxService, PrismaService],
})
export class VatTaxModule {}
