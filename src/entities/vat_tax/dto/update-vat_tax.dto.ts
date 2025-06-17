import { PartialType } from '@nestjs/mapped-types';
import { CreateVatTaxDto } from './create-vat_tax.dto';

export class UpdateVatTaxDto extends PartialType(CreateVatTaxDto) {}
