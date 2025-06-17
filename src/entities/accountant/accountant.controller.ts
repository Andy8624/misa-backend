import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AccountantService } from './accountant.service';
import { UpdateAccountantDto } from './dto/update-accountant.dto';
import { AccountantFilterType } from './dto/response-accountant.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Accountants')
@Controller('accountants')
export class AccountantController {
  constructor(private readonly accountantService: AccountantService) {}

  @Get()
  @ApiProtectedEndpoint('Find All Accountant')
  findAll(@Query() param: AccountantFilterType) {
    return this.accountantService.findAll(param);
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find Accountant by ID')
  findOne(@Param('id') id: string) {
    return this.accountantService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Accountant')
  update(
    @Param('id') id: string,
    @Body() updateAccountantDto: UpdateAccountantDto,
  ) {
    return this.accountantService.update(id, updateAccountantDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete Accountant')
  remove(@Param('id') id: string) {
    return this.accountantService.remove(id);
  }
}
