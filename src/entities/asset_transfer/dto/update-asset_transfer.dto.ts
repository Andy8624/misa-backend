import { PartialType } from '@nestjs/swagger';
import { CreateAssetTransferDto } from './create-asset_transfer.dto';

export class UpdateAssetTransferDto extends PartialType(
  CreateAssetTransferDto,
) {}
