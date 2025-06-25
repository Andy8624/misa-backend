import { Module } from '@nestjs/common';
import { CircularService } from './circular.service';
import { CircularController } from './circular.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CircularController],
  providers: [CircularService, PrismaService],
})
export class CircularModule {}
