import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CodeGeneratorController } from './code_generator/code-generator.controller';
import { CodeGeneratorService } from './code_generator/code-generator.service';

@Module({
  providers: [CodeGeneratorService, PrismaService],
  controllers: [CodeGeneratorController],
  exports: [CodeGeneratorService],
})
export class UtilitiesModule {}
