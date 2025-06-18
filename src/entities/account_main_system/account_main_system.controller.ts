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
import { AccountMainSystemService } from './account_main_system.service';
import { CreateAccountMainSystemDto } from './dto/create-account_main_system.dto';
import { UpdateAccountMainSystemDto } from './dto/update-account_main_system.dto';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';
import { AccountMainSystemFilterType } from 'src/interfaces/account_main_systerm.interface';
import { ApiTags } from '@nestjs/swagger';

@Controller('account-main-systems')
@ApiTags('Account Main System')
export class AccountMainSystemController {
  constructor(
    private readonly accountMainSystemService: AccountMainSystemService,
  ) {}

  @Post()
  @ApiProtectedEndpoint('Create Account Main System')
  create(@Body() createAccountMainSystemDto: CreateAccountMainSystemDto) {
    return this.accountMainSystemService.create(createAccountMainSystemDto);
  }

  @Get()
  @ApiProtectedEndpoint('Find All Account Main System')
  findAll(@Query() param: AccountMainSystemFilterType) {
    return this.accountMainSystemService.findAll(param);
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find Account Main System by ID')
  findOne(@Param('id') id: string) {
    return this.accountMainSystemService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Account Main System')
  update(
    @Param('id') id: string,
    @Body() updateAccountMainSystemDto: UpdateAccountMainSystemDto,
  ) {
    return this.accountMainSystemService.update(id, updateAccountMainSystemDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete Account Main System')
  remove(@Param('id') id: string) {
    return this.accountMainSystemService.remove(id);
  }
}
