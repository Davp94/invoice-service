import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from 'src/common/module/crypto/crypto.service';
import { Customer } from 'src/entity/customer';
import { Repository } from 'typeorm';
import { CustomerDto } from '../dto/customer.dto';
import { CreateCustomerDto } from '../dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private cryptoService: CryptoService
  ) {}

  async getAllCustomer(): Promise<CustomerDto[]> {
    const customer: Customer[] = await this.customerRepository.find({});
    customer.map(cus => {
      //PASSWORD ENCRYPTED
      console.log('encrypted password', cus.cus_password);
      //PASSWORD DCRYPTED
      console.log('dcrypted password', this.cryptoService.dcryptData(cus.cus_password));
    });
    return customer;
  }

  async saveCustomer(createCustomerDto: CreateCustomerDto): Promise<CustomerDto> {
    createCustomerDto.cus_password = await this.cryptoService.encryptData(createCustomerDto.cus_password);
    const customerCreated: Customer = await this.customerRepository.save(createCustomerDto);

    return customerCreated;
  }
}
