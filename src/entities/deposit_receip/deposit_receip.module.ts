import { Module } from '@nestjs/common';
import { DepositReceipService } from './deposit_receip.service';
import { DepositReceipController } from './deposit_receip.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DepositReceipController],
  providers: [DepositReceipService, PrismaService],
})
export class DepositReceipModule {}
