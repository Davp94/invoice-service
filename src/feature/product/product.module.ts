import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entity';
import { FindallProductService } from './service/findall-product.service';
import { ProductController } from './controller/product.controller';

@Module({
  providers: [FindallProductService],
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature(entities)],
  exports: [FindallProductService],
})
export class ProductModule {}
