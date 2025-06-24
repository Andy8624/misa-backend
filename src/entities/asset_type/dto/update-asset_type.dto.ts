import { PartialType } from '@nestjs/swagger';
import { CreateAssetTypeDto } from './create-asset_type.dto';

export class UpdateAssetTypeDto extends PartialType(CreateAssetTypeDto) {}
