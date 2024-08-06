import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from 'src/common/module/crypto/crypto.service';
import { Customer } from 'src/entity/customer';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private cryptoService: CryptoService
  ) {}

  async getAllCustomer(): Promise<Customer[]> {
    const customer: Customer[] = await this.customerRepository.find({});
    customer.map(cus => {
      //PASSWORD ENCRYPTED
      console.log('encrypted password', cus.cus_password);
      //PASSWORD DCRYPTED
      console.log('dcrypted password', this.cryptoService.dcryptData(cus.cus_password));
    });
    return customer;
  }

  async saveCustomer(customer: Customer): Promise<Customer> {
    customer.cus_password = await this.cryptoService.encryptData(customer.cus_password);
    const customerCreated: Customer = await this.customerRepository.save(customer);

    return customerCreated;
  }
}
