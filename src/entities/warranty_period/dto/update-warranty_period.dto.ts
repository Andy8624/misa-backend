import { PartialType } from '@nestjs/swagger';
import { CreateWarrantyPeriodDto } from './create-warranty_period.dto';

export class UpdateWarrantyPeriodDto extends PartialType(CreateWarrantyPeriodDto) {}
