import { PartialType } from '@nestjs/swagger';
import { CreateSalesReturnCostDto } from './create-sales_return_cost.dto';

export class UpdateSalesReturnCostDto extends PartialType(
  CreateSalesReturnCostDto,
) {}
