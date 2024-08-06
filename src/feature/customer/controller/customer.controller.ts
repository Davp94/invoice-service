import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { Customer } from 'src/entity/customer';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async findAllCustomer(): Promise<Customer[]> {
    const response = await this.customerService.getAllCustomer();
    return response;
  }

  @Post()
  async saveCustomer(@Req() req, @Body() customer: Customer): Promise<Customer> {
    return await this.customerService.saveCustomer(customer);
  }
}
