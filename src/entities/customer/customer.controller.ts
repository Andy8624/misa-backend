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
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerFilterType } from './dto/response-customer.dto';
import { User } from 'src/config/custom-decorator/accountant.decorator';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(
    @Body() createCustomerDto: CreateCustomerDto,
    @User('id') accountantId: string,
  ) {
    console.log(accountantId);
    return this.customerService.create({ ...createCustomerDto, accountantId });
  }

  @Get()
  findAll(@Query() param: CustomerFilterType) {
    return this.customerService.findAll(param);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
