import { PartialType } from '@nestjs/swagger';
import { CreateAssetRevaluationDto } from './create-asset_revaluation.dto';

export class UpdateAssetRevaluationDto extends PartialType(
  CreateAssetRevaluationDto,
) {}
