import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entity/customer';
import { AuthDataDto } from '../dto/auth-data.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from '../dto/auth.dto';
import { CryptoService } from 'src/common/module/crypto/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}

  async authUser(data: AuthDto): Promise<AuthDataDto> {
    const valid = await this.validateUser(data);
    const dataAuth: AuthDataDto = { token: '' };
    if (valid) {
      const customer: Customer = await this.customerRepository.findOne({ where: [{ cus_nit: data.username }, { email: data.username }] });
      const payload = { id: customer.cus_id };
      const token = await this.jwtService.signAsync(payload);
      dataAuth.token = token;
    } else {
      throw new Error('Error en authenticación');
    }
    return dataAuth;
  }

  private async validateUser(data: AuthDto): Promise<boolean> {
    let customer: Customer = {
      cus_id: 0,
      cus_names: '',
      cus_lastname: '',
      cus_password: '',
      cus_nit: '',
      cus_razon_social: '',
      email: '',
    };
    try {
      customer = await this.customerRepository.findOne({ where: { cus_nit: data.username } });
    } catch (error) {
      console.log(error);
    }

    if (!customer) {
      try {
        customer = await this.customerRepository.findOne({ where: { email: data.username } });
      } catch (error) {
        console.log('🚀 ~ AuthService ~ validateUser ~ customer:', customer);
        console.log('🚀 ~ AuthService ~ validateUser ~ error:', error);
        throw new Error('Usuario no encontrado');
      }
    }

    if (customer.cus_password != (await this.cryptoService.encryptData(data.password))) {
      throw new Error('Las contraseñas no coinciden');
    }
    return customer && customer.cus_id > 0;
  }
}
