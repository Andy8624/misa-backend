import { PartialType } from '@nestjs/swagger';
import { CreateAssetFormationOriginDto } from './create-asset_formation_origin.dto';

export class UpdateAssetFormationOriginDto extends PartialType(CreateAssetFormationOriginDto) {}
