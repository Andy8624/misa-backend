import { PartialType } from '@nestjs/swagger';
import { CreateAssetRevaluationDetailDto } from './create-asset_revaluation_detail.dto';

export class UpdateAssetRevaluationDetailDto extends PartialType(CreateAssetRevaluationDetailDto) {}
