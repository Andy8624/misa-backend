import { PartialType } from '@nestjs/swagger';
import { CreateAssetAccessoryDto } from './create-asset_accessory.dto';

export class UpdateAssetAccessoryDto extends PartialType(CreateAssetAccessoryDto) {}
