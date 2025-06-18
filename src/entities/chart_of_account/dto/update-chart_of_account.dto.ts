import { PartialType } from '@nestjs/swagger';
import { CreateChartOfAccountDto } from './create-chart_of_account.dto';

export class UpdateChartOfAccountDto extends PartialType(
  CreateChartOfAccountDto,
) {}
