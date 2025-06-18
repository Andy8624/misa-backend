import { Module } from '@nestjs/common';
import { WarrantyPeriodService } from './warranty_period.service';
import { WarrantyPeriodController } from './warranty_period.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [WarrantyPeriodController],
  providers: [WarrantyPeriodService, PrismaService],
})
export class WarrantyPeriodModule {}
