import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@Controller('bank')
@ApiTags('Bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  @ApiProtectedEndpoint('Create Bank')
  create(@Body() createBankDto: CreateBankDto) {
    return this.bankService.create(createBankDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find all Bank')
  findAll() {
    return this.bankService.findAll();
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find one Bank')
  findOne(@Param('id') id: string) {
    return this.bankService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Bank')
  update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDto) {
    return this.bankService.update(id, updateBankDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete Bank')
  remove(@Param('id') id: string) {
    return this.bankService.remove(id);
  }
}
