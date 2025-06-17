import { Module } from '@nestjs/common';
import { GoodsAndServicesGroupService } from './goods_and_services_group.service';
import { GoodsAndServicesGroupController } from './goods_and_services_group.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [GoodsAndServicesGroupController],
  providers: [GoodsAndServicesGroupService, PrismaService],
})
export class GoodsAndServicesGroupModule {}
