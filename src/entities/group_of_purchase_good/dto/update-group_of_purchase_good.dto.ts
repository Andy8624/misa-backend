import { PartialType } from '@nestjs/swagger';
import { CreateGroupOfPurchaseGoodDto } from './create-group_of_purchase_good.dto';

export class UpdateGroupOfPurchaseGoodDto extends PartialType(
  CreateGroupOfPurchaseGoodDto,
) {}
