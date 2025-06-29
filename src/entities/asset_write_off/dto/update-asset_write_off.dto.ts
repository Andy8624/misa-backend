import { PartialType } from '@nestjs/swagger';
import { CreateAssetWriteOffDto } from './create-asset_write_off.dto';

export class UpdateAssetWriteOffDto extends PartialType(
  CreateAssetWriteOffDto,
) {}
