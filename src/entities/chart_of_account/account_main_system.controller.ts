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
import { ChartOfAccountService } from './account_main_system.service';
import { CreateChartOfAccountDto } from './dto/create-chart_of_account.dto';
import { UpdateChartOfAccountDto } from './dto/update-chart_of_account.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';
import { ChartOfAccountFilterType } from 'src/interfaces/account_main_systerm.interface';
import { ApiTags } from '@nestjs/swagger';

@Controller('account-main-systems')
@ApiTags('Account Main System')
export class ChartOfAccountController {
  constructor(private readonly chartOfAccountService: ChartOfAccountService) {}

  @Post()
  @ApiProtectedEndpoint('Create Account Main System')
  create(@Body() createChartOfAccountDto: CreateChartOfAccountDto) {
    return this.chartOfAccountService.create(createChartOfAccountDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find All Account Main System')
  findAll(@Query() param: ChartOfAccountFilterType) {
    return this.chartOfAccountService.findAll(param);
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find Account Main System by ID')
  findOne(@Param('id') id: string) {
    return this.chartOfAccountService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Account Main System')
  update(
    @Param('id') id: string,
    @Body() updateChartOfAccountDto: UpdateChartOfAccountDto,
  ) {
    return this.chartOfAccountService.update(id, updateChartOfAccountDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete Account Main System')
  remove(@Param('id') id: string) {
    return this.chartOfAccountService.remove(id);
  }
}
