import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ChartOfAccountService } from './chart_of_account.service';
import { CreateChartOfAccountDto } from './dto/create-chart_of_account.dto';
import { UpdateChartOfAccountDto } from './dto/update-chart_of_account.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';
import { ChartOfAccountFilterType } from 'src/interfaces/account_main_systerm.interface';
import { ApiTags } from '@nestjs/swagger';

@Controller('chart-of-accounts')
@ApiTags('Chart Of Account')
export class ChartOfAccountController {
  constructor(private readonly chartOfAccountService: ChartOfAccountService) {}

  @Post()
  @ApiProtectedEndpoint('Create Chart Of Account')
  create(@Body() createChartOfAccountDto: CreateChartOfAccountDto) {
    return this.chartOfAccountService.create(createChartOfAccountDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find All Chart Of Account')
  findAll(@Query() param: ChartOfAccountFilterType) {
    return this.chartOfAccountService.findAll(param);
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find Chart Of Account by ID')
  findOne(@Param('id') id: string) {
    return this.chartOfAccountService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Chart Of Account')
  update(
    @Param('id') id: string,
    @Body() updateChartOfAccountDto: UpdateChartOfAccountDto,
  ) {
    return this.chartOfAccountService.update(id, updateChartOfAccountDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete Chart Of Account')
  remove(@Param('id') id: string) {
    return this.chartOfAccountService.remove(id);
  }
}
