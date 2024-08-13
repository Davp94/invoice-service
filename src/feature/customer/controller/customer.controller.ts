import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { Customer } from 'src/entity/customer';
import { CustomerDto } from '../dto/customer.dto';
import { CreateCustomerDto } from '../dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async findAllCustomer(): Promise<CustomerDto[]> {
    const response = await this.customerService.getAllCustomer();
    return response;
  }

  @Post()
  async saveCustomer(@Req() req, @Body() createCustomerDto: CreateCustomerDto): Promise<CustomerDto> {
    return await this.customerService.saveCustomer(createCustomerDto);
  }
}
