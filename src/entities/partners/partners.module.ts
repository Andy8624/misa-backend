import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { PrismaService } from 'src/prisma.service';
import { CustomerService } from 'src/entities/customer/customer.service';

@Module({
  controllers: [PartnersController],
  providers: [PartnersService, PrismaService, CustomerService],
})
export class PartnersModule {}
