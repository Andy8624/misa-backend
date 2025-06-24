import { PartialType } from '@nestjs/swagger';
import { CreateAssetComponentDto } from './create-asset_component.dto';

export class UpdateAssetComponentDto extends PartialType(
  CreateAssetComponentDto,
) {}
