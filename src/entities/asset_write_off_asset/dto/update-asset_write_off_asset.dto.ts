import { PartialType } from '@nestjs/swagger';
import { CreateAssetWriteOffAssetDto } from './create-asset_write_off_asset.dto';

export class UpdateAssetWriteOffAssetDto extends PartialType(CreateAssetWriteOffAssetDto) {}
