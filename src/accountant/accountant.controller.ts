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

@Controller('accountants')
export class AccountantController {
  constructor(private readonly accountantService: AccountantService) {}

  @Get()
  findAll(@Query() param: AccountantFilterType) {
    return this.accountantService.findAll(param);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountantService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAccountantDto: UpdateAccountantDto,
  ) {
    return this.accountantService.update(id, updateAccountantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountantService.remove(id);
  }
}
