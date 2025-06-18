import { Module } from '@nestjs/common';
import { ChartOfAccountService } from './account_main_system.service';
import { ChartOfAccountController } from './account_main_system.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ChartOfAccountController],
  providers: [ChartOfAccountService, PrismaService],
})
export class ChartOfAccountModule {}
