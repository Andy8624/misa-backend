import { Module } from '@nestjs/common';
import { ChartOfAccountService } from './chart_of_account.service';
import { ChartOfAccountController } from './chart_of_account.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ChartOfAccountController],
  providers: [ChartOfAccountService, PrismaService],
})
export class ChartOfAccountModule {}
