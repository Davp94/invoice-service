import { Module } from '@nestjs/common';
import { CustomerController } from './controller/customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entity';
import { CustomerService } from './service/customer.service';

@Module({
  providers: [CustomerService],
  controllers: [CustomerController],
  imports: [TypeOrmModule.forFeature(entities)],
  exports: [CustomerService],
})
export class CustomerModule {}
