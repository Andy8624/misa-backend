import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ENTITY_CODE_CONFIGS, EntityType } from './code-generator.types';

@Injectable()
export class CodeGeneratorService {
  constructor(private prisma: PrismaService) {}

  /**
   * Gets the next code for a given entity type using predefined configurations
   * @param type The entity type (must be defined in ENTITY_CODE_CONFIGS)
   * @param companyId The ID of the company to generate the code for
   * @returns The next available code
   */
  async getNextCodeByType(type: string, companyId: string): Promise<string> {
    if (!Object.values(EntityType).includes(type as EntityType)) {
      throw new BadRequestException(`Unknown entity type: ${type}`);
    }

    if (!companyId) {
      throw new BadRequestException('Company ID is required');
    }

    const config = ENTITY_CODE_CONFIGS[type as EntityType];

    return this.generateNextCode(
      config.entityName,
      config.prefix,
      config.codeField,
      config.padLength,
      config.companyIdField,
      companyId,
    );
  }

  /**
   * Generates the next code for a given entity with customizable prefix
   * @param entityName The name of the entity in Prisma
   * @param prefix The prefix to use for the code
   * @param codeField The field name that contains the code in the entity
   * @param padLength The total length of the numerical part
   * @param companyIdField The field name for the company ID in the entity
   * @param companyId The company ID value
   * @returns The next available code
   */
  async generateNextCode(
    entityName: string,
    prefix: string,
    codeField: string,
    padLength: number,
    companyIdField: string,
    companyId: string,
  ): Promise<string> {
    // Dynamic query to get the latest code for the specified entity and company
    const records = await this.prisma[entityName].findMany({
      where: {
        [codeField]: {
          startsWith: prefix,
        },
        [companyIdField]: companyId, // Filter by company ID
        deletedAt: null,
      },
      orderBy: {
        [codeField]: 'desc',
      },
      take: 1,
      select: {
        [codeField]: true,
      },
    });

    let nextNumber = 1;

    // If records exist, extract the number part and increment
    if (records.length > 0) {
      const latestCode = records[0][codeField];
      // Extract the number part (remove the prefix)
      const numberPart = latestCode.substring(prefix.length);
      // Parse it as integer and increment
      nextNumber = parseInt(numberPart, 10) + 1;
    }

    // Pad the number with leading zeros
    const paddedNumber = nextNumber.toString().padStart(padLength, '0');

    // Combine prefix and padded number
    return `${prefix}${paddedNumber}`;
  }
}
