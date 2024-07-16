import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entity';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
})
export class InvoiceModule {}
