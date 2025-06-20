import { Module } from '@nestjs/common';
import { PaymentTermService } from './payment_term.service';
import { PaymentTermController } from './payment_term.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PaymentTermController],
  providers: [PaymentTermService, PrismaService],
})
export class PaymentTermModule {}
