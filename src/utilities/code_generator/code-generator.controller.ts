import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CodeGeneratorService } from './code-generator.service';
import { EntityType, CodeGenerationResponse } from './code-generator.types';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('CodeGenerator')
@Controller('code-generator')
export class CodeGeneratorController {
  constructor(private codeGeneratorService: CodeGeneratorService) {}

  @Get('next-code')
  @ApiProtectedEndpoint(
    'Get next available code for an entity',
    'Returns the next available code based on entity type. Used when creating new records.',
  )
  @ApiQuery({
    name: 'type',
    description: 'Entity type',
    required: true,
    enum: EntityType,
  })
  @ApiQuery({
    name: 'companyId',
    description: 'ID of the company to generate the code for',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the next available code',
    type: CodeGenerationResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid entity type or missing company ID',
  })
  async getNextCode(
    @Query('type') type: string,
    @Query('companyId') companyId: string,
  ): Promise<CodeGenerationResponse> {
    const code = await this.codeGeneratorService.getNextCodeByType(
      type,
      companyId,
    );
    return { code };
  }
}
