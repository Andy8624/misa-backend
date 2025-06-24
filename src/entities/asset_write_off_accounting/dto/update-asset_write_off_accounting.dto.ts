import { PartialType } from '@nestjs/swagger';
import { CreateAssetWriteOffAccountingDto } from './create-asset_write_off_accounting.dto';

export class UpdateAssetWriteOffAccountingDto extends PartialType(CreateAssetWriteOffAccountingDto) {}
