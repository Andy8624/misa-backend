import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateAccountantDto } from './create-accountant.dto';

export class UpdateAccountantDto extends PartialType(
  OmitType(CreateAccountantDto, ['password'] as const),
) {}
