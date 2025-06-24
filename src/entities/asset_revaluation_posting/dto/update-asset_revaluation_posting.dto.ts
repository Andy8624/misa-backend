import { PartialType } from '@nestjs/swagger';
import { CreateAssetRevaluationPostingDto } from './create-asset_revaluation_posting.dto';

export class UpdateAssetRevaluationPostingDto extends PartialType(
  CreateAssetRevaluationPostingDto,
) {}
