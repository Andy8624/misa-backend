import { PartialType } from '@nestjs/swagger';
import { CreateAssetAllocationDto } from './create-asset_allocation.dto';

export class UpdateAssetAllocationDto extends PartialType(CreateAssetAllocationDto) {}
