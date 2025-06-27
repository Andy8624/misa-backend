import { PartialType } from '@nestjs/swagger';
import { CreateSalesContractDto } from './create-sales_contract.dto';

export class UpdateSalesContractDto extends PartialType(
  CreateSalesContractDto,
) {}
