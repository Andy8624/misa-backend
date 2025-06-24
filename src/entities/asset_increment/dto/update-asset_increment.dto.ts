import { PartialType } from '@nestjs/swagger';
import { CreateAssetIncrementDto } from './create-asset_increment.dto';

export class UpdateAssetIncrementDto extends PartialType(
  CreateAssetIncrementDto,
) {}
