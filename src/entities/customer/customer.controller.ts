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
import { ApiTags } from '@nestjs/swagger';
import { ApiProtectedEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiProtectedEndpoint('Create Customer')
  create(
    @Body() createCustomerDto: CreateCustomerDto,
    @User('id') accountantId: string,
  ) {
    console.log(accountantId);
    return this.customerService.create({ ...createCustomerDto, accountantId });
  }

  @Get()
  @ApiProtectedEndpoint('Find All Customer')
  findAll(@Query() param: CustomerFilterType) {
    return this.customerService.findAll(param);
  }

  @Get(':id')
  @ApiProtectedEndpoint('Find Customer by ID')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Patch(':id')
  @ApiProtectedEndpoint('Update Customer')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiProtectedEndpoint('Delete Customer')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
