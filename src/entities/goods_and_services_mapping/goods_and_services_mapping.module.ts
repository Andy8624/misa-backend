import { Module } from '@nestjs/common';
import { GoodsAndServicesMappingService } from './goods_and_services_mapping.service';
import { GoodsAndServicesMappingController } from './goods_and_services_mapping.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [GoodsAndServicesMappingController],
  providers: [GoodsAndServicesMappingService, PrismaService],
})
export class GoodsAndServicesMappingModule {}
