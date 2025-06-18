import { Module } from '@nestjs/common';
import { GoodsAndServicesService } from './goods_and_services.service';
import { GoodsAndServicesController } from './goods_and_services.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [GoodsAndServicesController],
  providers: [GoodsAndServicesService, PrismaService],
})
export class GoodsAndServicesModule {}
