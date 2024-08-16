import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entity';
import { FindallProductService } from './service/findall-product.service';
import { ProductController } from './controller/product.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  providers: [FindallProductService],
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature(entities), MulterModule.register({ dest: '../uploads' })],
  exports: [FindallProductService],
})
export class ProductModule {}
