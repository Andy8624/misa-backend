import { PartialType } from '@nestjs/swagger';
import { CreateAssetDepreciationInfoDto } from './create-asset_depreciation_info.dto';

export class UpdateAssetDepreciationInfoDto extends PartialType(
  CreateAssetDepreciationInfoDto,
) {}
