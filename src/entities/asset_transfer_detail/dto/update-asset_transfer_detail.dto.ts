import { PartialType } from '@nestjs/swagger';
import { CreateAssetTransferDetailDto } from './create-asset_transfer_detail.dto';

export class UpdateAssetTransferDetailDto extends PartialType(
  CreateAssetTransferDetailDto,
) {}
