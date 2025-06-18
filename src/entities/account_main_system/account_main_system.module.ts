import { Module } from '@nestjs/common';
import { AccountMainSystemService } from './account_main_system.service';
import { AccountMainSystemController } from './account_main_system.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AccountMainSystemController],
  providers: [AccountMainSystemService, PrismaService],
})
export class AccountMainSystemModule {}
