import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BankAccountService } from './bank_account.service';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('bank-account')
@ApiTags('BankAccount')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Post()
  @ApiProtectedEndpoint('Create BankAccount')
  create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountService.create(createBankAccountDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all BankAccount')
  findAll() {
    return this.bankAccountService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one BankAccount')
  findOne(@Param('id') id: string) {
    return this.bankAccountService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update BankAccount')
  update(
    @Param('id') id: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.bankAccountService.update(id, updateBankAccountDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete BankAccount')
  remove(@Param('id') id: string) {
    return this.bankAccountService.remove(id);
  }
}
