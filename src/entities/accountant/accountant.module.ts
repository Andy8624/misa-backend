import { Module } from '@nestjs/common';
import { AccountantService } from './accountant.service';
import { AccountantController } from './accountant.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AccountantController],
  providers: [AccountantService, PrismaService],
})
export class AccountantModule {}
